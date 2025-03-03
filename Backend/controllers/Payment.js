
import snap from '../payment/midtransClient.js';
import Transaction from '../models/TransactionModel.js';

export const createPayment = async (req, res) => {
    const { id_booking, total_price, payment_method } = req.body;

    const orderId = `order-${id_booking}-${Date.now()}`;

    const parameter = {
        transaction_details: {
            order_id: orderId,
            gross_amount: total_price
        },
        credit_card: {
            secure: true
        },
        customer_details: {
            first_name: 'User', // Ubah sesuai kebutuhan
            email: 'user@example.com'
        }
    };

    try {
        const transaction = await snap.createTransaction(parameter);

        // Simpan transaksi ke database
        const newTransaction = await Transaction.create({
            id_booking,
            total_price,
            payment_method,
            payment_status: 'pending'
        });

        res.status(200).json({
            token: transaction.token,
            redirect_url: transaction.redirect_url,
            transaction: newTransaction
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
