import { beforeEach, describe, expect, it } from 'vitest'
import { CustomerRepositoryDatabase } from '../../../infra/customer/repository/database/CustomerRepositoryDatabase'
import CustomerModel from '../../../infra/database/sequelize/model/CustomerModel'
import { FindCustomer } from '../find/FindCustomer'
import CreateCustomer from './CreateCustomer'

describe('CreateCustomer test', () => {

    beforeEach(async () => {
        await CustomerModel.sync({ force: true })
    })

    it('Should create a new customer', async () => {
        const customerRepository = new CustomerRepositoryDatabase()
        const createCustomer = new CreateCustomer(customerRepository)
        const findCustomer = new FindCustomer(customerRepository)
        const { customerId } = await createCustomer.execute({
            name: 'John Doe',
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001'
        })
        const customer = await findCustomer.execute(customerId)
        expect(customer.id).toBe(customerId)
        expect(customer.street).toBe('123 Main St')
        expect(customer.city).toBe('New York')
        expect(customer.state).toBe('NY')
        expect(customer.zipCode).toBe('10001')
        expect(customer.rewardPoints).toBe(0)
    })
})
