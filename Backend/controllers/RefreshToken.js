import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.sendStatus(401);
    }

    const user = await User.findOne({
      where: {
        refresh_token: refreshToken
      }
    });
    if (!user) {
      return res.sendStatus(403);
    }

    console.log("User found:", user.dataValues);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.error("JWT verification error:", err.message);
        return res.sendStatus(403);
      }

      console.log("JWT successfully verified. Decoded payload:", decoded);

      const userId = user.id;
      const name = user.name;
      const email = user.email;

      const secretKey = process.env.ACCSESS_TOKEN_SECRET || "fallback_secret_key";
      if (!secretKey) {
        console.error("Access token secret is undefined!");
        return res.sendStatus(500);
      }

      const accessToken = jwt.sign(
        { userId, name, email },
        secretKey,
        { expiresIn: "50s" }
      );
      console.log("Access token generated successfully:", accessToken);
      res.json({ accessToken });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.sendStatus(500);
  }
};
