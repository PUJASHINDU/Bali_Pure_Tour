import { DataTypes } from 'sequelize';
import { sequelize } from '../config/Database.js';

export const Transaction = sequelize.define('Transaction', {
    transaction_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    customer_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customer_email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gross_amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'PAID', 'CANCELLED'),
        defaultValue: 'PENDING'
    },
    snap_token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    snap_redirect_url: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'transactions',
    timestamps: true
});
