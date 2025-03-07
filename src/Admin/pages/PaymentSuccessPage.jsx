import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";

const PaymentSuccessPage = () => {
  const { order_id } = useParams(); // 🔥 Ambil order_id dari URL
  console.log("📌 Order ID dari URL:", order_id); // 🔍 Cek apakah order_id ada
  const [transaction, setTransaction] = useState(null);
  const navigate = useNavigate(); // 🔄 Untuk navigasi

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/transaction/${order_id}`);
        setTransaction(response.data);
      } catch (error) {
        console.error("❌ Gagal mengambil transaksi:", error.response?.data || error.message);
      }
    };

    fetchTransaction();
  }, [order_id]);

  if (!transaction) {
    return <p className="text-center text-gray-500">🔄 Loading transaksi...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Card className="w-full max-w-lg shadow-lg border">
        <CardBody className="p-6">
          <Typography
            variant="h4"
            className="text-customGreen font-poppins text-center font-semibold text-md"
          >
            Deskripsi Pembayaran
          </Typography>

          <Typography className="text-gray-600 text-center mt-2">
            Thank you, {transaction.full_name}!
          </Typography>

          <div className="mt-4">
            <div className="flex justify-between items-center gap-x-4 mb-2">
              <h1 className="text-base font-semibold font-poppins w-1/2">Name</h1>
              <Typography className="font-poppins w-1/2">{transaction.full_name}</Typography>
            </div>

            <div className="flex justify-between items-center gap-x-4 mb-2">
              <h1 className="text-base font-semibold font-poppins w-1/2">Email</h1>
              <Typography className="font-poppins w-1/2">{transaction.email}</Typography>
            </div>

            <div className="flex justify-between items-center gap-x-4 mb-2">
              <h1 className="text-base font-semibold font-poppins w-1/2">Phone Number</h1>
              <Typography className="font-poppins w-1/2">{transaction.phone_number}</Typography>
            </div>

            <div className="flex justify-between items-center gap-x-4 mb-2">
              <h1 className="text-base font-semibold font-poppins w-1/2">Total Price</h1>
              <Typography className="font-poppins w-1/2">
                {transaction.total_price.toLocaleString()}
              </Typography>
            </div>

            <div className="flex justify-between items-center gap-x-4 mb-2">
              <h1 className="text-base font-semibold font-poppins w-1/2">Package Tour Name</h1>
              <Typography className="font-poppins w-1/2">
                {transaction.package_name.toLocaleString()}
              </Typography>
            </div>

            <div className="flex justify-between items-center gap-x-4 mb-2">
              <h1 className="text-base font-semibold font-poppins w-1/2">Number of participants</h1>
              <Typography className="font-poppins w-1/2">
                {transaction.num_participants.toLocaleString()} People
              </Typography>
            </div>


            <div className="flex justify-between items-center gap-x-4 mb-2">
              <h1 className="text-base font-semibold font-poppins w-1/2">Tour date</h1>
              <Typography className="font-poppins w-1/2">
                {transaction.checkin_date.toLocaleString()}
              </Typography>
            </div>

            <div className="flex justify-between items-center gap-x-4 mb-2">
              <h1 className="text-base font-semibold font-poppins w-auto">Status Payment</h1>
              <span
                className={`min-w-[70px] mr-40 px-2 py-1 text-white rounded-2xl text-center ${transaction.payment_status === "paid" ? "bg-customGreen" : "bg-customred"
                  }`}
              >
                {transaction.payment_status}
              </span>
            </div>


            <div className="flex justify-between items-center gap-x-4 mb-2">
              <h1 className="text-base font-semibold font-poppins w-1/2">Transaction Date</h1>
              <Typography className="font-poppins w-1/2">
                {transaction.transaction_date.toLocaleString()}
              </Typography>
            </div>

            <div className="flex justify-between items-center gap-x-4 mb-2">
              <h1 className="text-base font-semibold w-1/2">Payment Method</h1>
              <Typography className="font-poppins w-1/2">
                {transaction.payment_method?.toUpperCase() || "Unknown"}
              </Typography>
            </div>

          </div>

          <div className="mt-6 text-center">
            <Button
              className="bg-customGreen text-white px-4 py-2 rounded hover:bg-customGreenslow font-poppins"
              onClick={() => navigate("/")} // 🔥 Redirect ke home
            >
              Back to Home
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>

  );
};

export default PaymentSuccessPage;
