import dotenv from "dotenv";
import midtransClient from "midtrans-client";
import Transaction from "../models/TransactionModel.js"; // ✅ Import model Sequelize

dotenv.config();

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

export const createPayment = async (req, res) => {
  try {
    console.log("📥 Data yang diterima dari frontend:", req.body);

    const { id_booking, total_price, full_name, email, phone_number, package_name, num_participants, checkin_date, payment_method, payment_numbers } = req.body;

    if (!id_booking || !total_price || !email || !phone_number) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 🔹 **Buat Order ID Unik**
    const order_id = `order-${id_booking}-${Date.now()}`;

    // 🔥 Pastikan checkin_date valid
    const formattedCheckinDate = checkin_date && checkin_date !== "-" ? checkin_date : null;

    // 🔥 **Simpan transaksi ke database sebelum request ke Midtrans**
    await Transaction.create({
      id_transaction: order_id, // ✅ ID transaksi sesuai format Midtrans
      order_id, // ✅ Simpan order_id agar bisa dicari saat update status
      id_booking,
      total_price,
      payment_status: "pending",
      transaction_date: new Date(),
      full_name,
      email,
      phone_number,
      package_name,
      num_participants,
      checkin_date: formattedCheckinDate,
      payment_method,
      payment_numbers,

    });

    // ✅ **Parameter Midtrans**
    let parameter = {
      transaction_details: {
        order_id,
        gross_amount: Math.round(total_price) // 🔥 Pastikan total_price tanpa koma
      },
      credit_card: { secure: true },
      customer_details: {
        first_name: full_name.split(" ")[0],
        email,
        phone: phone_number
      },
    };

    // 🔥 **Buat transaksi ke Midtrans**
    const transaction = await snap.createTransaction(parameter);
    console.log("✅ Transaction Token:", transaction.token);

    res.json({ token: transaction.token });
  } catch (error) {
    console.error("❌ Error di Backend:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


export const paymentNotification = async (req, res) => {
  try {
    console.log("📌 Notifikasi Midtrans Diterima:", req.body);

    const { order_id, transaction_status, va_numbers, payment_type } = req.body;

    if (!order_id) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    let payment_status = "pending";
    let payment_method = "Unknown"; // Default kalau data kosong
    let payment_numbers = null;


    // 🔥 **Ambil Payment Method dari Midtrans**
    if (va_numbers && va_numbers.length > 0) {
      payment_method = va_numbers[0].bank.toUpperCase(); // Misal: "BNI", "BRI"
      payment_numbers = JSON.stringify(va_numbers); // Simpan VA Numbers dalam bentuk JSON
    } else if (payment_type) {
      payment_method = payment_type.toUpperCase(); // Misal: "GOPAY", "SHOPEEPAY"
    }

    console.log("💰 Metode Pembayaran:", payment_method);
    console.log("📌 Nomor VA:", payment_numbers);

    if (transaction_status === "settlement" || transaction_status === "capture") {
      payment_status = "paid";
    } else if (["deny", "expire", "cancel"].includes(transaction_status)) {
      payment_status = "failed";
    }

    // ✅ **Cari transaksi berdasarkan order_id**
    const transaction = await Transaction.findOne({ where: { order_id } });

    if (!transaction) {
      console.log(`⚠️ Tidak ada transaksi dengan Order ID ${order_id} ditemukan.`);
      return res.status(404).json({ message: "Transaction not found" });
    }

    // let payment_numbers = null;

    if (va_numbers && va_numbers.length > 0) {
      payment_numbers = va_numbers[0].va_number; // Ambil hanya nomor VA
    }

    await Transaction.update(
      {
        payment_status,
        payment_method,
        payment_numbers, // Simpan hanya nomor VA
        updatedAt: new Date()
      },
      { where: { order_id } }
    );

    console.log(`✅ Status pembayaran ${order_id} diupdate jadi ${payment_status}, metode: ${payment_method}`);
    res.json({ message: "Payment status updated", status: payment_status });
  } catch (error) {
    console.error("❌ Error updating payment status:", error.message);
    res.status(500).json({ message: "Failed to update payment status", error: error.message });
  }
};


export const getTransactionDetail = async (req, res) => {
  try {
    const { order_id } = req.params;

    if (!order_id) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    // 🔍 **Cari transaksi berdasarkan order_id**
    const transaction = await Transaction.findOne({
      where: { order_id },
      attributes: [
        "id_transaction",
        "order_id",
        "full_name",
        "email",
        "phone_number",
        "package_name",
        "num_participants",
        "checkin_date",
        "total_price",
        "payment_status",
        "transaction_date",
        "payment_method",
        "payment_numbers",
      ],
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // ✅ **Pastikan payment_numbers diparse ke JSON**
    let payment_numbers = [];
    if (transaction.payment_numbers) {
      try {
        payment_numbers = JSON.parse(transaction.payment_numbers);
      } catch (error) {
        console.error("❌ Error parsing payment_numbers:", error.message);
      }
    }

    res.json({ ...transaction.toJSON(), payment_numbers }); // Kirim hasil parsing
  } catch (error) {
    console.error("❌ Error fetching transaction:", error.message);
    res.status(500).json({ message: "Failed to fetch transaction", error: error.message });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      attributes: [
        "id_transaction",
        "order_id",
        "full_name",
        "package_name",
        "transaction_date",
        "payment_method",
        "payment_status",
      ],
      order: [["transaction_date", "DESC"]], // Urutkan transaksi dari terbaru
    });

    res.json(transactions);
  } catch (error) {
    console.error("❌ Error fetching transactions:", error.message);
    res.status(500).json({ message: "Failed to fetch transactions", error: error.message });
  }
};