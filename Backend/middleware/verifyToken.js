import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log("Authorization Header:", authHeader); // Debug Header
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    console.log("Token tidak ditemukan");
    return res.sendStatus(401); // Unauthorized
  }
  jwt.verify(token, process.env.ACCSESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log("Token tidak valid:", err);
      return res.sendStatus(403); // Forbidden
    }
    req.userId = decoded.userId;
    console.log("Decoded User ID:", req.userId); // Debug User ID
    next();
  });
};
