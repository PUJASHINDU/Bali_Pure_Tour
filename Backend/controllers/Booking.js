import Booking from "../models/BookingModel.js";
import PackageTour from "../models/PackgeTourModel.js";
import User from "../models/UserModel.js";


export const createBooking = async (req, res) => {
  try {
    console.log("Request received:", req.body);  // Logging untuk debugging

    const { id_user, package_name, people_join, booking_date } = req.body;

    // Validasi input
    if (!id_user || !package_name || !people_join || !booking_date) {
      return res.status(400).json({ message: "Semua field harus diisi" });
    }

    // Ambil data user berdasarkan id_user
    const user = await User.findOne({ where: { id: id_user } });
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Ambil data package berdasarkan package_name
    const packageTour = await PackageTour.findOne({ where: { package_name } });
    if (!packageTour) {
      return res.status(404).json({ message: "Paket tour tidak ditemukan" });
    }

    // Tentukan harga berdasarkan jumlah peserta (people_join)
    let price_tour;
    if (people_join === 2) {
      price_tour = packageTour.price_2_person;
    } else if (people_join >= 3 && people_join <= 5) {
      price_tour = packageTour.price_3_5_person;
    } else if (people_join >= 6 && people_join <= 10) {
      price_tour = packageTour.price_6_10_person;
    } else if (people_join >= 11) {
      price_tour = packageTour.price_11_person;
    } else {
      return res.status(400).json({ message: "Jumlah orang tidak valid" });
    }

    // Simpan booking baru ke database
    const newBooking = await Booking.create({
      id_user,
      id_package: packageTour.id_package,
      booking_date,
      people_join,
      price_tour,
    });

    res.status(201).json({
      message: "Booking berhasil disimpan",
      data: {
        id_booking: newBooking.id_booking,
        full_name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        package_name: packageTour.package_name,
        people_join,
        price_tour,
        booking_date,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Gagal menyimpan booking",
      error: error.message,
    });
  }
};
