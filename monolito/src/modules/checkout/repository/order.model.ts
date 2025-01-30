import { DataTypes, Model } from 'sequelize'
import sequelize from './sequelize'

export class OrderModel extends Model {
    id: string
    clientId: string
    status: string
    total: number
    createdAt: Date
    updatedAt: Date
}

OrderModel.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    clientId: DataTypes.STRING,
    status: DataTypes.STRING,
    total: DataTypes.DECIMAL(10, 2),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    timestamps: false,
    tableName: 'orders',
    sequelize,
})
