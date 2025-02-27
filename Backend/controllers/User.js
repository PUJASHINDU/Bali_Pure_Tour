import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.userId, // Filter berdasarkan userId dari token
      },
      attributes: [
        'id',
        'name',
        'email',
        'phone_number',
        'birth_date',
        'gender',
        'photo_profile', // Tambahkan atribut foto profil
      ],
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};


// Registrasi Pengguna Baru
export const Register = async (req, res) => {
  const { name, email, phone_number, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await User.create({
      name: name,
      email: email,
      phone_number: phone_number,
      password: hashPassword,
    });
    res.json({ msg: "Yeayy Register Berhasil" });
  } catch (error) {
    console.log(error);
  }
};


export const Login = async (req, res) => {
  try {
    const user = await User.findAll({
      where: {
        email: req.body.email
      }
    });

    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Wrong password" });

    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const profilePicture = user[0].profilePicture || 'default.jpg';

    const accessToken = jwt.sign({ userId, name, email, profilePicture }, process.env.ACCSESS_TOKEN_SECRET, {
      expiresIn: '50s'
    });

    const refreshToken = jwt.sign({ userId, name, email, profilePicture }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d'
    });

    await User.update({ refresh_token: refreshToken }, { where: { id: userId } });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,  // Menghindari akses cookie di JS
      secure: process.env.NODE_ENV === 'production',  // Gunakan HTTPS di production
      maxAge: 24 * 60 * 60 * 1000,  // Cookie berlaku selama 1 hari
      sameSite: 'Strict',  // SameSite mengontrol akses antar domain
    });

    // Kembalikan accessToken dan data pengguna dalam respons
    res.json({
      accessToken,
      user: {
        id: userId,
        name,
        email,
        profilePicture
      }
    });
  } catch (error) {
    res.status(404).json({ msg: "Email Tidak Terdaftar" });
  }
};



export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.sendStatus(204);
  }

  try {
    // Cari user berdasarkan refresh token
    const user = await User.findOne({
      where: {
        refresh_token: refreshToken
      }
    });

    // Jika user tidak ditemukan, kirim status 204 (No Content)
    if (!user) {
      return res.sendStatus(204);
    }

    // Update refresh token menjadi null
    await User.update({ refresh_token: null }, {
      where: {
        id: user.id
      }
    });

    // Hapus cookie refresh token
    res.clearCookie('refreshToken');
    res.json({ msg: "Yaaah kamu logout" });

  } catch (error) {
    // Jika ada error, log dan kirim status 500 (Internal Server Error)
    console.error(error);
    return res.sendStatus(500);
  }
};



export const UpdateUser = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.sendStatus(401); // Token tidak ada
    }

    const user = await User.findOne({ where: { refresh_token: refreshToken } });
    if (!user) {
      return res.sendStatus(403); // Pengguna tidak ditemukan
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.sendStatus(403); // Token tidak valid
      }

      // Ambil data dari body request
      const { name, email, phone_number, birth_date, gender, photo_profile } = req.body;

      // Update data pengguna di database
      await User.update(
        { name, email, phone_number, birth_date, gender, photo_profile },
        { where: { id: user.id } }
      );

      // Buat akses token baru dengan data terbaru
      const accessToken = jwt.sign(
        { userId: user.id, name, email, phone_number, birth_date, gender, photo_profile },
        process.env.ACCSESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      // Kirim response dengan access token baru
      res.json({
        message: "Profile updated successfully",
        accessToken,
      });
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.sendStatus(500); // Internal server error
  }
};
