import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { useAuth } from "../Context/AuthContext";

const BookingInformationComponent = () => {
  const [bookingData, setBookingData] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const { token, refreshAccessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        console.log("🔄 Fetching booking data...");
        let currentToken = token;
        if (!currentToken) {
          currentToken = await refreshAccessToken();
          if (!currentToken) throw new Error("Gagal refresh token!");
        }

        const response = await axios.get("http://localhost:5000/getUserBooking", {
          headers: { Authorization: `Bearer ${currentToken}` },
          withCredentials: true,
        });

        const latestBooking = response.data.data
          ?.sort((a, b) => b.id_booking - a.id_booking)
          ?.slice(0, 1)[0];

        setBookingData(latestBooking);
        console.log("✅ Booking data:", latestBooking);

        if (latestBooking?.id_booking) {
          fetchTransaction(latestBooking.id_booking);

          // **Tambahkan polling transaksi setiap 5 detik**
          const interval = setInterval(() => {
            fetchTransaction(latestBooking.id_booking);
          }, 2000);

          return () => clearInterval(interval); // Hentikan polling saat komponen unmount
        }
      } catch (error) {
        console.error("❌ Error fetching booking data:", error.response?.data || error.message);
      }
    };

    fetchBookingData();
  }, [token]);


  const fetchTransaction = async (id_booking) => {
    try {
      console.log("🔄 Fetching transaction data for booking ID:", id_booking);
      const response = await axios.get(`http://localhost:5000/transaction/booking/${id_booking}`);
      setTransaction(response.data.data);
      console.log("✅ Transaction Data:", response.data);
    } catch (error) {
      console.error("❌ Gagal mengambil transaksi:", error.response?.data || error.message);
    }
  };

  const handlePayment = async () => {
    try {
      if (!bookingData) {
        alert("Booking data belum tersedia!");
        return;
      }

      // const paymentData = {
      //   id_booking: bookingData.id_booking,
      //   total_price: bookingData.price || 0,
      //   full_name: bookingData.full_name || "Guest",
      //   email: bookingData.email || "-",
      //   phone_number: bookingData.phone_number || "-",
      //   package_name: bookingData.package_name || "-",
      //   num_participants: bookingData.num_participants || "-",
      //   checkin_date: bookingData.checkin_date === "-" ? null : bookingData.checkin_date,
      //   payment_method: bookingData.num_payment_method || "-",
      //   payment_numbers: JSON.stringify.va_numbers || "[]", // Simpan sebagai JSON string
      // };

      const paymentData = {
        id_booking: bookingData.id_booking,
        total_price: bookingData.price || 0,
        full_name: bookingData.full_name || "Guest",
        email: bookingData.email || "-",
        phone_number: bookingData.phone_number || "-",
        package_name: bookingData.package_name || "-",
        num_participants: bookingData.num_participants || "-",
        checkin_date: bookingData.checkin_date === "-" ? null : bookingData.checkin_date,
        payment_method: bookingData.num_payment_method || "-",
        payment_numbers: Array.isArray(bookingData.va_numbers) && bookingData.va_numbers.length > 0
            ? BigInt(bookingData.va_numbers[0].va_number) // Gunakan `BigInt` agar cocok dengan MySQL BIGINT
            : null,
    };



      console.log("📌 Data dikirim ke backend:", paymentData);

      const response = await axios.post(
        "http://localhost:5000/create-payment",
        paymentData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { token: paymentToken, order_id } = response.data;
      if (!paymentToken) throw new Error("Token pembayaran tidak diterima.");

      window.snap.pay(paymentToken, {
        onSuccess: async (result) => { // Tambahkan async
          console.log("✅ Payment Success:", result);

          // Pastikan fetchTransaction berjalan secara berurutan
          await fetchTransaction(bookingData.id_booking);
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
    <div className="flex justify-center items-center min-h-screen px-4 mb-10  overflow-hidden">
      <Card className="w-full max-w-screen-md">
        <CardBody>
          <Typography variant="h4" className="mb-2 text-lg font-poppins">
            <span className="text-customGreen font-semibold">Hallo</span>{" "}
            <span className="text-customGreenslow font-medium">
              {bookingData?.full_name || "It looks like you haven't booked a tour package with us at PT Bali Pure Tour yet. Please make a booking first, then come back here to check your booking."}
            </span>
          </Typography>

          {!bookingData ? (
            <Typography className="font-poppins text-center text-gray-500">
              No Booking History Data.
            </Typography>
          ) : (
            <>
              <Typography className="font-poppins text-justify mb-2">
                Here are your latest tour package booking details.
              </Typography>

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

              <Typography className="font-poppins text-justify mb-3">
                <h1 className="text-base font-semibold">Status Booking</h1>
                {bookingData.status || "-"}
              </Typography>

              <Typography className="font-poppins text-justify mb-3 font-semibold">
                Detail Result Payment
              </Typography>


              {transaction ? (
                <>
                  <div className="mb-2">
                    <h1 className="text-base font-semibold font-poppins w-auto">Status Payment</h1>
                    <span
                      className={`min-w-[70px] mr-40 px-2 py-1 text-white rounded-2xl text-center ${transaction.payment_status === "paid" ? "bg-customGreen" : "bg-customred"
                        }`}
                    >
                      {transaction.payment_status}
                    </span>
                  </div>

                  <div className="mb-2">
                    <h1 className="text-base font-semibold font-poppins w-1/2">Total Price</h1>
                    <Typography className="font-poppins w-1/2">
                      {transaction.total_price.toLocaleString()}
                    </Typography>
                  </div>


                  <div className="mb-2">
                    <h1 className="text-base font-semibold font-poppins w-1/2">Transaction Date</h1>
                    <Typography className="font-poppins w-1/2">
                      {transaction.transaction_date.toLocaleString()}
                    </Typography>
                  </div>

                  <div className="mb-2">
                    <h1 className="text-base font-semibold w-1/2">Payment Method</h1>
                    <Typography className="font-poppins w-1/2">
                      {transaction.payment_method?.toUpperCase() || "Unknown"}
                    </Typography>
                  </div>
                </>
              ) : (
                bookingData.status === "confirmed" ? (
                  <Typography className="font-poppins text-justify mb-2">
                    <h1 className="text-lg font-semibold text-customGreen">
                      Booking Confirmed:
                    </h1>
                    Your booking has been confirmed. Please proceed with the payment and complete the process.
                  </Typography>
                ) : (
                  <Typography className="font-poppins text-justify mb-2">
                    <h1 className="text-lg font-semibold text-customGreen">Information :</h1>
                    Hello! Your tour package booking was successful. Please wait until the booking is confirmed. After that, check your booking status update in the Booking History section of your profile.
                  </Typography>
                )
              )}
              {transaction?.payment_status === "paid" && (
                <Typography className="font-poppins text-justify mb-2">
                  <h1 className="text-lg font-semibold text-customGreen">
                    Payment Successful:
                  </h1>
                  Your payment has been successfully completed. Thank you for booking with us!
                </Typography>
              )}

              {transaction?.payment_status === "pending" && (
                <Typography className="font-poppins text-justify mb-2">
                  <h1 className="text-lg font-semibold text-customOrange">Payment Pending:</h1>
                  Your payment is currently pending. Please complete the payment to confirm your booking.
                  <br />
                  Please make the payment using the following details:
                  {transaction?.payment_method && transaction?.payment_numbers ? (
                    <div>
                      <strong>Bank:</strong> {transaction.payment_method.toUpperCase()}
                      <br />
                      <strong>VA Number:</strong> {transaction.payment_numbers}
                    </div>
                  ) : (
                    <p>No payment details available. Please check your payment information.</p>
                  )}
                </Typography>
              )}

              {transaction?.payment_status === "failed" && (
                <Typography className="font-poppins text-justify mb-2">
                  <h1 className="text-lg font-semibold text-customRed">
                    Payment Failed:
                  </h1>
                  Your payment was unsuccessful. Please try again or use a different payment method.
                </Typography>
              )}

              {/* Tombol Pembayaran (Muncul Hanya Jika Booking Confirmed) */}
              {bookingData.status === "confirmed" && transaction?.payment_status !== "paid" && (
                <Button
                  size="md"
                  variant="text"
                  className="flex items-center gap-2 mb-4 font-semibold font-poppins bg-customGreen text-white"
                  onClick={handlePayment}
                >
                  Pay Now !!
                </Button>
              )}
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default BookingInformationComponent;
