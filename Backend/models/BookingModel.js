import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js"
import PackageTour from "./PackgeTourModel.js";
import Payment from "./PaymentModel.js"
const { DataTypes } = Sequelize;

const Booking = db.define(
  "booking",
  {
    id_booking: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User", // Nama tabel User
        key: "id",
      },
    },
    id_package: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Packagetour", // Nama tabel PackageTour
        key: "id_package",
      },
    },
    id_payment: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Payment", // Nama tabel Payments
        key: "id_payment",
      },
    },
    booking_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    people_join: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price_tour: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
// Relasi Booking -> User
Booking.belongsTo(User, { foreignKey: "user_id", as: "User", });
User.hasMany(Booking, { foreignKey: "user_id", as: "Booking" });

// Relasi Booking dengan PackageTour (One-to-Many)
Booking.belongsTo(PackageTour, { foreignKey: "id_package", as: "Package" });
PackageTour.hasMany(Booking, { foreignKey: "id_package" });

// Relasi Booking dengan Payment (One-to-One)
Booking.belongsTo(Payment, { foreignKey: "id_payment", as: "Payment" });
Payment.hasOne(Booking, { foreignKey: "id_payment", as: "Booking" });

export default Booking;