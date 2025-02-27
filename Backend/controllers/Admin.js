import Admin from '../models/AdminModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const LoginAdmin = async (req, res) => {
  const { user_name, password } = req.body;

  try {
    // Cari admin berdasarkan username
    const admin = await Admin.findOne({ where: { user_name } });

    if (!admin) {
      return res.status(404).json({ msg: "Admin tidak ditemukan" });
    }

    // Verifikasi password yang dimasukkan dengan password yang di-hash di database
    const match = await bcrypt.compare(password, admin.password); // Verifikasi password
    if (!match) {
      return res.status(400).json({ msg: "Password salah" });
    }

    // Jika password cocok, buat token
    const adminId = admin.id_admin;
    const accessToken = jwt.sign(
      { adminId, user_name },
      process.env.ACCSESS_TOKEN_SECRET,
      { expiresIn: '50s' }
    );

    // Kembalikan access token
    res.json({ accessToken });

  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan pada server", error });
  }
};
