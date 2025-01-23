import { DataTypes, Model } from 'sequelize'
import sequelize from './sequelize'

class ProductModel extends Model {
    id: string
    name: string
    description: string
    salesPrice: number
}

ProductModel.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    salesPrice: DataTypes.FLOAT,
}, {
    sequelize,
    tableName: 'products',
    timestamps: false
})


export default ProductModel
