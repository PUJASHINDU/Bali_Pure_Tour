import User from "../models/UserModel.js";
import PackageTour from "../models/PackgeTourModel.js";
import Transaction from "../models/TransactionModel.js";
import Booking from "../models/BookingModel.js";

// ✅ Ambil Total Transaksi
export const getTotalTransactions = async (req, res) => {
  try {
    const totalTransactions = await Transaction.count();
    res.status(200).json({ totalTransactions });
  } catch (error) {
    console.error("❌ Error fetching total transactions:", error);
    res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
  }
};

// ✅ Ambil Jumlah Pengguna
export const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.count();
    res.status(200).json({ totalUsers });
  } catch (error) {
    console.error("❌ Error fetching total users:", error);
    res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
  }
};

// ✅ Ambil Total Pendapatan
export const getTotalRevenue = async (req, res) => {
  try {
    const totalRevenue = await Transaction.sum("total_price");
    res.status(200).json({ totalRevenue });
  } catch (error) {
    console.error("❌ Error fetching total revenue:", error);
    res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
  }
};

// ✅ Ambil Paket Tour Aktif
export const getActivePackageTours = async (req, res) => {
  try {
    const activePackages = await PackageTour.count();
    res.status(200).json({ activePackages });
  } catch (error) {
    console.error("❌ Error fetching active package tours:", error);
    res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
  }
};

// ✅ Ambil Pemesanan Terbaru (5 Teratas)
export const getRecentBookings = async (req, res) => {
  try {
    const recentBookings = await Booking.findAll({
      order: [["createdAt", "DESC"]],
      limit: 5,
      attributes: ["id_booking", "full_name", "package_name", "checkin_date"],
    });

    res.status(200).json({ recentBookings });
  } catch (error) {
    console.error("❌ Error fetching recent bookings:", error);
    res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
  }
};

// ✅ Ambil Transaksi Berdasarkan Booking ID
export const getTransactionByBookingId = async (req, res) => {
  try {
    const { id_booking } = req.params;

    const transaction = await Transaction.findOne({ where: { id_booking } });
    if (!transaction) {
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }

    res.status(200).json({ data: transaction });
  } catch (error) {
    console.error("❌ Error fetching transaction:", error);
    res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
  }
};
