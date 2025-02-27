import fs from "fs";
import multer from "multer";
import path from "path";
import Galeries from "../models/GaleriesModel.js";

// **Konfigurasi multer untuk menyimpan gambar berdasarkan kategori**
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const category = req.body.category || "default"; // Kategori wajib dikirim dari frontend
    const uploadPath = `public/${category}`;

    // Buat folder jika belum ada
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Middleware upload
const uploadGallery = multer({ storage }).array("images", 10); // Bisa upload hingga 10 gambar

export const uploadGalleryImages = async (req, res) => {
  uploadGallery(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "Gagal mengupload gambar", error: err.message });
    }

    try {
      const { id_package, category } = req.body;
      if (!id_package) {
        return res.status(400).json({ message: "ID package harus disertakan" });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "File gambar tidak ditemukan" });
      }

      // Simpan gambar ke database
      let galeriesData = req.files.map((file) => ({
        id_package,
        img: `/${category}/${file.filename}`, // Path gambar
      }));

      await Galeries.bulkCreate(galeriesData);

      res.status(201).json({
        message: "Gambar berhasil diunggah",
        data: galeriesData,
      });
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
    }
  });
};

export const updateGalleryImages = async (req, res) => {
  const { id_package } = req.params;

  uploadGallery(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "Gagal mengupload gambar", error: err.message });
    }

    try {
      if (!id_package) {
        return res.status(400).json({ message: "ID package harus disertakan" });
      }

      // **Hapus galeri lama**
      await Galeries.destroy({ where: { id_package } });

      // **Simpan gambar baru**
      let galeriesData = [];
      if (req.files && req.files.length > 0) {
        galeriesData = req.files.map((file) => ({
          id_package,
          img: `/${req.body.category}/${file.filename}`, // Simpan path gambar
        }));

        await Galeries.bulkCreate(galeriesData);
      }

      res.status(200).json({
        message: "Galeri berhasil diperbarui",
        galeries: galeriesData,
      });
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
    }
  });
};
