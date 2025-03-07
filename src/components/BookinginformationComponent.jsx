import React, { useState, useEffect } from "react";
import axios from "axios";

import { useAuth } from "../Context/AuthContext"; // Ambil token dari AuthContext
import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

const BookingInformationComponent = () => {
  const [bookingData, setBookingData] = useState(null);
  const { token, refreshAccessToken } = useAuth(); // Ambil token & fungsi refresh

  useEffect(() => {

    const fetchBookingData = async () => {
      try {
        let currentToken = token;

        // 🔍 **Cek apakah token ada atau harus refresh**
        if (!currentToken) {
          console.log("⚠️ Token kosong, mencoba refresh...");
          currentToken = await refreshAccessToken();
          if (!currentToken) throw new Error("Gagal refresh token!");
        }

        // ✅ **Gunakan endpoint yang benar**
        const response = await axios.get("http://localhost:5000/getUserBooking", {
          headers: { Authorization: `Bearer ${currentToken}` }, // ✅ Kirim token di header
          withCredentials: true, // Pastikan cookie dikirim
        });

        console.log("✅ Data booking diterima:", response.data);

        // 🔥 **Ambil hanya 1 booking terbaru**
        const latestBooking = response.data.data
          ?.sort((a, b) => b.id_booking - a.id_booking) // Urutkan dari terbaru ke terlama
          ?.slice(0, 1)[0]; // Ambil 1 data terbaru

        setBookingData(latestBooking);

      } catch (error) {
        console.error("❌ Error fetching booking data:", error.response?.data || error.message);

        // 🚨 **Cek jika error karena token expired**
        if (error.response?.status === 403) {
          console.log("⚠️ Token mungkin expired, mencoba refresh...");
          const newToken = await refreshAccessToken();

          if (newToken) {
            console.log("🔄 Token berhasil diperbarui, mencoba fetch ulang...");
            fetchBookingData(); // 🔄 **Coba fetch ulang dengan token baru**
          } else {
            console.error("❌ Gagal refresh token, user harus login ulang.");
            alert("Session expired! Silakan login ulang.");
          }
        }
      }
    };

    fetchBookingData();
  }, [token]); // Refresh data jika token berubah

  const handlePayment = async () => {
    try {
      if (!bookingData) {
        alert("Booking data belum tersedia!");
        return;
      }

      const paymentData = {
        id_booking: bookingData.id_booking,
        total_price: bookingData.price || 0,
        full_name: bookingData.full_name || "Guest",
        email: bookingData.email || "-",
        phone_number: bookingData.phone_number || "-",
        package_name: bookingData.package_name || "-",
        num_participants: bookingData.num_participants || "-",
        checkin_date: bookingData.checkin_date === "-" ? null : bookingData.checkin_date, // ✅ Perbaiki ini
        payment_method: bookingData.num_payment_method || "-",
      };

      console.log("📌 Data ke backend:", paymentData);

      const response = await axios.post(
        "http://localhost:5000/create-payment",
        paymentData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { token: paymentToken, order_id } = response.data;
      if (!paymentToken) throw new Error("Token pembayaran tidak diterima.");

      window.snap.pay(paymentToken, {
        onSuccess: (result) => {
          console.log("✅ Payment Success:", result);

          // 🔥 Ambil order_id dari Midtrans atau backend
          const orderID = result.order_id || order_id;

          if (!orderID) {
            alert("Error: Order ID tidak ditemukan!");
            return;
          }

          // 🚀 Redirect ke halaman sukses dengan order_id
          window.location.href = `/payment-success/${orderID}`;
        },
        onPending: (result) => {
          console.log("⚠️ Payment Pending:", result);
          alert("Payment Pending!");
        },
        onError: (error) => {
          console.log("❌ Payment Error:", error);
          alert("Payment Failed!");
        },
        onClose: () => {
          console.log("🔴 Payment popup closed.");
        },
      });
    } catch (error) {
      console.error("❌ Error processing payment:", error);
      alert("Error processing payment: " + error.message);
    }
  };



  return (
    <div className="flex justify-center items-center min-h-screen px-4 mb-10 mt-4 overflow-hidden">
      <Card className="w-full max-w-screen-md">
        <CardBody>
          {/* Title */}
          <Typography variant="h4" className="mb-2 text-xl font-poppins">
            <span className="text-customGreen font-medium">Hallo</span>{" "}
            <span className="text-customGreenslow font-semibold">
              {bookingData?.full_name || "No booking found"}
            </span>
          </Typography>

          {/* Jika tidak ada booking */}
          {!bookingData ? (
            <Typography className="font-poppins text-center text-gray-500">
              No booking found
            </Typography>
          ) : (
            <>
              <Typography className="font-poppins text-justify mb-2">
                Here are your latest tour package booking details.
              </Typography>

              {/* Booking Details */}
              <Typography className="font-poppins text-justify mb-2">
                <h1 className="text-base font-semibold">Email</h1>
                {bookingData.email || "-"}
              </Typography>

              <Typography className="font-poppins text-justify mb-2">
                <h1 className="text-base font-semibold">Phone Number</h1>
                {bookingData.phone_number || "-"}
              </Typography>

              <Typography className="font-poppins text-justify mb-2">
                <h1 className="text-base font-semibold">Package Tour Name</h1>
                {bookingData.package_name || "-"}
              </Typography>

              <Typography className="font-poppins text-justify mb-2">
                <h1 className="text-base font-semibold">People Join the Tour</h1>
                {bookingData.num_participants || "-"} People
              </Typography>

              <Typography className="font-poppins text-justify mb-2">
                <h1 className="text-base font-semibold">Price Package Tour</h1>
                ${bookingData.price || "-"}
              </Typography>

              <Typography className="font-poppins text-justify mb-2">
                <h1 className="text-base font-semibold">Tour Date</h1>
                {bookingData.checkin_date || "-"}
              </Typography>

              <Typography className="font-poppins text-justify mb-2">
                <h1 className="text-base font-semibold">Status Booking</h1>
                {bookingData.status || "-"}
              </Typography>

              <Button
                size="md"
                variant="text"
                className="flex items-center gap-2 font-semibold font-poppins bg-customGreen text-white"
                onClick={handlePayment} // Tambahkan fungsi pembayaran
              >
                Pay Now !!
              </Button>
            </>
          )}

          <Typography className="font-poppins text-justify mb-2">
            <h1 className="text-lg font-semibold text-customGreen">Information :</h1>
            Please check your booking and payment status regularly to ensure everything is up to date.
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
};

export default BookingInformationComponent;
