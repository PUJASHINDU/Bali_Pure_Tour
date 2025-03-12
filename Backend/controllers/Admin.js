// import Admin from '../models/AdminModel.js';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// export const LoginAdmin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Cari admin berdasarkan username
//     const admin = await Admin.findOne({ where: { email } });

//     if (!admin) {
//       return res.status(404).json({ msg: "Admin tidak ditemukan" });
//     }

//     // Verifikasi password yang dimasukkan dengan password yang di-hash di database
//     const match = await bcrypt.compare(password, admin.password); // Verifikasi password
//     if (!match) {
//       return res.status(400).json({ msg: "Password salah" });
//     }

//     // Jika password cocok, buat token
//     const adminId = admin.id_admin;
//     const accessToken = jwt.sign(
//       { adminId, email },
//       process.env.ACCSESS_TOKEN_SECRET,
//       { expiresIn: '50s' }
//     );

//     // Kembalikan access token
//     res.json({ accessToken });

//   } catch (error) {
//     res.status(500).json({ msg: "Terjadi kesalahan pada server", error });
//   }
// };


// export const RegisterAdmin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Cek apakah username sudah terdaftar
//     const existingAdmin = await Admin.findOne({ where: { email } });
//     if (existingAdmin) {
//       return res.status(400).json({ msg: "Username sudah digunakan" });
//     }

//     // Hash password sebelum menyimpan ke database
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Simpan admin baru ke database
//     const newAdmin = await Admin.create({
//       email,
//       password: hashedPassword
//     });

//     res.status(201).json({ msg: "Admin berhasil terdaftar", admin: newAdmin });

//   } catch (error) {
//     res.status(500).json({ msg: "Terjadi kesalahan pada server", error });
//   }
// };

import Admin from '../models/AdminModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const LoginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari admin berdasarkan email
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(404).json({ msg: "Admin tidak ditemukan" });
    }

    // Verifikasi password
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(400).json({ msg: "Password salah" });
    }

    // Ambil ID admin dari database
    const adminId = admin.id_admin;

    // **🔥 Perbaiki penamaan ACCSESS_TOKEN_SECRET**
    const accessToken = jwt.sign(
      { adminId, email },
      process.env.ACCSESS_TOKEN_SECRET,  // ✅ Perbaiki typo di sini
      { expiresIn: "1h" }
    );

    // Kirim token sebagai respons
    res.json({ accessToken });

  } catch (error) {
    console.error("Error login admin:", error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};


export const RegisterAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cek apakah username sudah terdaftar
    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ msg: "Username sudah digunakan" });
    }

    // Hash password sebelum menyimpan ke database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Simpan admin baru ke database
    const newAdmin = await Admin.create({
      email,
      password: hashedPassword
    });

    res.status(201).json({ msg: "Admin berhasil terdaftar", admin: newAdmin });

  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan pada server", error });
  }
};


export const getAdminProfile = async (req, res) => {
  try {
    console.log("Decoded Admin ID:", req.admin.id_admin);

    const adminData = await Admin.findOne({
      where: { id_admin: req.admin.id_admin },
    });

    if (!adminData) return res.status(404).json({ message: "Admin tidak ditemukan" });

    res.json(adminData);
  } catch (error) {
    console.error("Error mengambil data admin:", error);
    res.status(500).json({ message: "Kesalahan server" });
  }
};
