import { DataTypes, Model } from 'sequelize'
import sequelize from './sequelize'

class InvoiceItemModel extends Model {
    id: string
    invoiceId: string
    name: string
    price: number
}

InvoiceItemModel.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    invoiceId: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2)
}, {
    sequelize,
    tableName: 'invoiceItems',
    timestamps: false
})

export default InvoiceItemModel
