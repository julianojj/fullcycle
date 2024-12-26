import { DataTypes, Model } from 'sequelize'
import sequelize from '../Sequelize'

class ProductModel extends Model {
    id: string
    name: string
    price: number
}

ProductModel.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
},
    {
        sequelize,
        modelName: 'Products',
        timestamps: false,
    }
)

export default ProductModel
