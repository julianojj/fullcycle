import { DataTypes, Model } from 'sequelize'
import sequelize from '../Sequelize'

class OrderModel extends Model {
    id: string
    customerId: string
    total: number
}

OrderModel.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    customerId: DataTypes.STRING,
    total: DataTypes.DECIMAL(10, 2),
},
    {
        sequelize,
        modelName: 'Order',
        timestamps: false,
    }
)

export default OrderModel
