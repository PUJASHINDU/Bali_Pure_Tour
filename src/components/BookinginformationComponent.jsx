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
  const { token } = useAuth(); // Ambil token dari AuthContext

  useEffect(() => {
    const fetchBookingData = async () => {
      const token = localStorage.getItem("accessToken"); // ✅ Ambil token dari localStorage

      if (!token) {
        console.error("Token not found, redirecting to login...");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/getUserBooking", {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Kirim token di header
          withCredentials: true, // Pastikan cookie dikirim
        });

        console.log("Response Data:", response.data);
        setBookingData(response.data.data); // ✅ Simpan data booking

      } catch (error) {
        console.error("Error fetching booking data:", error.response?.data || error.message);
      }
    };


    fetchBookingData();
  }, [token]); // Refresh data jika token berubah


  return (
    <div className="flex justify-center items-center min-h-screen px-4 mb-10 mt-4 overflow-hidden">
      <Card className="w-full max-w-screen-md">
        <CardBody>
          {/* Title */}
          <Typography variant="h4" className="mb-2 text-xl font-poppins">
            <span className="text-customGreen font-medium">Hallo</span>{" "}
            <span className="text-customGreenslow font-semibold">{bookingData?.full_name || "-"}</span>
          </Typography>

          <Typography className="font-poppins text-justify mb-2">
            Here are your tour package booking details along with the order status and payment status.
          </Typography>

          {/* Booking Details */}
          <Typography className="font-poppins text-justify mb-2">
            <h1 className="text-base font-semibold">Email</h1>
            {bookingData?.email || "-"}
          </Typography>

          <Typography className="font-poppins text-justify mb-2">
            <h1 className="text-base font-semibold">Phone Number</h1>
            {bookingData?.phone_number || "-"}
          </Typography>

          <Typography className="font-poppins text-justify mb-2">
            <h1 className="text-base font-semibold">Package ID</h1>
            {bookingData?.id_package || "-"}
          </Typography>

          <Typography className="font-poppins text-justify mb-2">
            <h1 className="text-base font-semibold">People Join the Tour</h1>
            {bookingData?.num_participants || "-"} People
          </Typography>

          <Typography className="font-poppins text-justify mb-2">
            <h1 className="text-base font-semibold">Price Package Tour</h1>
            ${bookingData?.price || "-"}
          </Typography>

          <Typography className="font-poppins text-justify mb-2">
            <h1 className="text-base font-semibold">Tour Date</h1>
            {bookingData?.checkin_date || "-"}
          </Typography>

          <Typography className="font-poppins text-justify mb-2">
            <h1 className="text-base font-semibold">Status Booking</h1>
            {bookingData?.status || "-"}
          </Typography>

          <div className="mt-1 mb-3">
            <a href="#" className="inline-block">
              <Button
                size="md"
                variant="text"
                className="flex items-center gap-2 font-semibold font-poppins bg-customGreen text-white"
              >
                Print Invoice !!
              </Button>
            </a>
          </div>

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
