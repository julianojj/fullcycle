import { DataTypes, Model } from 'sequelize'
import sequelize from './sequelize'

class ClientModel extends Model {
    id: string
    name: string
    email: string
    street: string
    complement: string
    city: string
    state: string
    zipCode: string
    createdAt: Date
    updatedAt: Date
}

ClientModel.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    street: DataTypes.STRING,
    complement: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
    tableName: 'products',
    timestamps: false
})


export default ClientModel
