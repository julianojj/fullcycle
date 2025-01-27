import { DataTypes, Model } from 'sequelize'
import sequelize from './sequelize'

class InvoiceModel extends Model {
    id: string
    name: string
    document: string
    street: string
    number: string
    complement: string
    city: string
    state: string
    zipCode: string
    total: number
    createdAt: Date
    updatedAt: Date
}

InvoiceModel.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    document: DataTypes.STRING,
    street: DataTypes.STRING,
    number: DataTypes.STRING,
    complement: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    total: DataTypes.DECIMAL(10, 2),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
    tableName: 'InvoiceModel',
    timestamps: false
})

export default InvoiceModel
