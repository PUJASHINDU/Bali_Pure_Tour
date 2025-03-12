import jwt from "jsonwebtoken";
import Admin from "../models/AdminModel.js";

const verifyadmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ msg: "Akses ditolak, token tidak ada" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCSESS_TOKEN_SECRET);

    console.log("Decoded Token:", decoded); // ✅ Debugging

    if (!decoded.adminId) {
      console.error("adminId tidak ditemukan dalam token");
      return res.status(400).json({ msg: "Token tidak valid atau tidak berisi adminId" });
    }

    const admin = await Admin.findOne({
      where: { id_admin: decoded.adminId },
      attributes: ["id_admin", "email"],
    });

    if (!admin) return res.status(404).json({ msg: "Admin tidak ditemukan" });

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(403).json({ msg: "Token tidak valid atau terjadi kesalahan" });
  }
};

export { verifyadmin };
