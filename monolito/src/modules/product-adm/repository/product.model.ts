import { DataTypes, Model } from 'sequelize'
import sequelize from './sequelize'

class ProductModel extends Model {
    id: string
    name: string
    description: string
    purchasePrice: number
    salesPrice: number
    stock: number
    createdAt: Date
    updatedAt: Date
}

ProductModel.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    salesPrice: DataTypes.FLOAT,
    purchasePrice: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
    tableName: 'products',
    timestamps: false
})

export default ProductModel
