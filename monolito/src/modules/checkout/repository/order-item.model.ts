import { DataTypes, Model } from 'sequelize'
import sequelize from './sequelize'

export class OrderItemModel extends Model {
    orderId: string
    productId: string
    name: string    
    description: string
    price: number
    createdAt: Date
    updatedAt: Date
}

OrderItemModel.init({
    orderId: {
        type: DataTypes.STRING
    },
    productId: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    timestamps: false,
    tableName: 'orderItems',
    sequelize,
})
