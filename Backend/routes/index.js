import express from "express";
import upload from "../middleware/upload.js";
import { getUser, Register, Login, Logout, UpdateUser } from "../controllers/User.js";
import { LoginAdmin } from "../controllers/Admin.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { createPackageTourWithGaleries, updatePackageTourWithGaleriesAndRundown, getTourById, getTourGallery, getTourRundown, getAllPackageTours } from "../controllers/PackageTour.js";
import { createCardDestination, updateCardDestination, deleteCardDestinationWithPackageTour, getCardDestinationById  } from "../controllers/CardDestination.js";
import { getAllCardDestinations } from "../controllers/CardDestination.js";
import { getGalleryImages } from "../controllers/CardDestination.js";
import { uploadGalleryImages, updateGalleryImages  } from "../controllers/Galeries.js";
import { createBooking , getUserBookings } from "../controllers/Booking.js";
import { createPayment, paymentNotification,  getTransactionDetail } from "../controllers/Payment.js";
import { authenticateUser } from "../middleware/authenticateUser.js"; // Pastikan import






// import { refreshToken } from "../controllers/RefreshToken.js";


const router = express.Router();
// router.get("/token", refreshToken);
//Admin
router.post("/admin", LoginAdmin);

router.post('/booking-tour', verifyToken, createBooking, async (req, res) => {
  console.log("Token diterima:", req.headers.authorization);
  console.log("Payload booking:", req.body);
});
router.get("/getUserBooking", verifyToken, getUserBookings);
router.post("/create-payment", createPayment);
router.post("/midtrans-notification", paymentNotification);
router.get("/transaction/:order_id", getTransactionDetail); // ✅ Route untuk ambil detail transaksi




// Get paket-tour
router.get("/get-packages", getAllPackageTours)
// kelola paket tour
router.post("/package-tour", upload.array("galeries", 10), (req, res, next) => {
  next();
}, createPackageTourWithGaleries);

// update paket tour
router.put("/package-tour-update/:id_package", updatePackageTourWithGaleriesAndRundown);

// kelola card tour
router.post("/card-tour", createCardDestination);
// update card tour
router.put("/card-destination-update/:id", updateCardDestination);

// Route untuk fetch data
router.get("/get-card-destinations", getAllCardDestinations);

// Get Crad Destination By id
router.get("/get-card-destination/:id", getCardDestinationById);

// Route untuk mengambil gambar galeri
router.get("/get-gallery-images", getGalleryImages);

// Route Update gambar
router.post("/upload-gallery",   uploadGalleryImages);

// Route Update gambar
router.put("/update-gallery/:id_package", updateGalleryImages); // Perhatikan nama parameternya

// Dalate Card Tour dan Package Tour
router.delete('/card-destination-dalate/:id', deleteCardDestinationWithPackageTour);

// get data paket tour

router.get("/package-tour/:id", getTourById);
router.get("/tour/gallery/:id", getTourGallery);
router.get("/tour/rundown/:id", getTourRundown);


router.get('/user', verifyToken, getUser);
router.post('/user-register', Register);
router.post('/login', Login);
router.put('/update', verifyToken, UpdateUser);
router.delete('/logout', Logout);
router.get('/token', refreshToken);

export default router