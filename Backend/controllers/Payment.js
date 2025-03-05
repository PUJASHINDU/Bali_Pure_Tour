import dotenv from 'dotenv';
import midtransClient from 'midtrans-client';

dotenv.config();

// ✅ Pastikan serverKey terbaca dari .env
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

// ✅ Fungsi untuk membuat transaksi Midtrans
export const createPayment = async (req, res) => {
  try {
    console.log("📌 Data Request Payment:", req.body); // Debugging

    const { order_id, gross_amount, first_name, email, phone } = req.body;

    if (!order_id || !gross_amount || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let parameter = {
      transaction_details: {
        order_id: order_id,
        gross_amount: gross_amount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: first_name || "Guest",
        email: email,
        phone: phone || "",
      },
    };

    const transaction = await snap.createTransaction(parameter);
    console.log("✅ Transaction Token:", transaction.token);

    res.json({ token: transaction.token });
  } catch (error) {
    console.error("❌ Error Midtrans:", error.response?.data || error.message);
    res.status(500).json({ message: "Payment creation failed", error: error.message });
  }
};
