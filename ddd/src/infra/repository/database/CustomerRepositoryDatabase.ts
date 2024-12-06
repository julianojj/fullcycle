import { Address, Customer } from '../../../domain/entity/Customer'
import { CustomerRepositoryInterface } from '../../../domain/repository/CustomerRepositoryInterface'
import CustomerModel from '../../database/sequelize/model/CustomerModel'

export class CustomerRepositoryDatabase implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            city: entity.address.city,
            state: entity.address.state,
            zipCode: entity.address.zipCode,
            rewardPoints: entity.rewardPoints,
        })
    }

    async findById(id: string): Promise<Customer> {
        const customerResult = await CustomerModel.findOne({
            where: {
                id
            }
        })
        if (!customerResult) return undefined
        return new Customer(customerResult.id, customerResult.name, new Address(customerResult.street, customerResult.city, customerResult.state, customerResult.zipCode))
    }

    async findAll(): Promise<Customer[]> {
        const results = await CustomerModel.findAll()
        const customers: Customer[] = []
        for (const result of results) {
            customers.push(new Customer(result.id, result.name, new Address(result.street, result.city, result.state, result.zipCode)))
        }
        return customers
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            street: entity.address.street,
            city: entity.address.city,
            state: entity.address.state,
            zipCode: entity.address.zipCode,
            rewardPoints: entity.rewardPoints,
        }, {
            where: {
                id: entity.id
            }
        })
    }
}
