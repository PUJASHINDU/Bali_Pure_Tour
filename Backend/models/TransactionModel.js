import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Booking from "./BookingModel.js"; // Import Booking

const { DataTypes } = Sequelize;

const Transaction = db.define(
  "transaction",
  {
    id_transaction: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_booking: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Booking",
        key: "id_booking",
      },
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.ENUM("pending", "paid", "failed"),
      defaultValue: "pending",
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transaction_date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

// Relasi dengan Booking
Transaction.belongsTo(Booking, { foreignKey: "id_booking", as: "Booking" });
Booking.hasOne(Transaction, { foreignKey: "id_booking", as: "Transaction", onDelete: 'CASCADE' });

export default Transaction;
