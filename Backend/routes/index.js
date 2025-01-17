import express from "express";
import { getUser, Register, Login, Logout, UpdateUser } from "../controllers/User.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
const router = express.Router();

router.get('/user', verifyToken, getUser);
router.post('/user', Register);
router.post('/login', Login);
router.put('/update', verifyToken, UpdateUser);
router.delete('/logout', Logout);
router.get('/token', refreshToken);

export default router