import { DataTypes, Model } from 'sequelize'
import sequelize from './sequelize'

class ClientModel extends Model {
    id: string
    name: string
    email: string
    address: string
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
    address: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
    tableName: 'products',
    timestamps: false
})


export default ClientModel
