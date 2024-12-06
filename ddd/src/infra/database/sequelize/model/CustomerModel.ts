import { DataTypes, Model } from 'sequelize'
import sequelize from '../Sequelize'

class CustomerModel extends Model {
    id: string
    name: string
    street: string
    city: string
    state: string
    zipCode: string
}

CustomerModel.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    name: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    rewardPoints: DataTypes.INTEGER,
}, {
    sequelize,
    modelName: 'Customer',
    timestamps: false,
})

export default CustomerModel
