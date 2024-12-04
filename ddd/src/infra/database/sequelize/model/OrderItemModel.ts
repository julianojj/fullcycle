import { DataTypes, Model } from 'sequelize'
import sequelize from '../Sequelize'

class OrderItemModel extends Model {
    itemId: string
    orderId: string
    name: string
    price: number
    quantity: number
}

OrderItemModel.init({
    orderId: DataTypes.UUID,
    itemId: DataTypes.UUID,
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    quantity: DataTypes.INTEGER,
}, {
    sequelize,
    modelName: 'OrderItem',
    timestamps: false
})

export default OrderItemModel
