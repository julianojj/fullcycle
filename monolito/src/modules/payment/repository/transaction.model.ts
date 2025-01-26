import { DataTypes, Model } from 'sequelize'
import sequelize from './sequelize'

class TransactionModel extends Model {
    id: string
    orderId: string
    amount: number
    paymentMethod: string
    status: string  
    createdAt?: Date        
    updatedAt?: Date
}

TransactionModel.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    orderId: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    paymentMethod: DataTypes.STRING,
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
    tableName: 'transactions',
    timestamps: false
})


export default TransactionModel
