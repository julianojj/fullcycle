import { beforeEach, describe, expect, it } from 'vitest'
import CustomerFactory from '../../../domain/customer/factory/CustomerFactory'
import { ExceptionMessages } from '../../../exception/ValidationException'
import { CustomerRepositoryDatabase } from '../../../infra/customer/repository/database/CustomerRepositoryDatabase'
import CustomerModel from '../../../infra/database/sequelize/model/CustomerModel'
import { FindCustomer } from './FindCustomer'

describe('FindCustomer test', () => {
    beforeEach(async () => {
        await CustomerModel.sync({ force: true })
    })

    it('Should find customer', async () => {
        const customerRepository = new CustomerRepositoryDatabase()
        const findCustomer = new FindCustomer(customerRepository)
        const input = CustomerFactory.create(
            'John Doe',
            '123 Main St',
            'New York',
            'NY',
            '10001'
        )
        await customerRepository.create(input)  
        const customer = await findCustomer.execute(input.id)
        expect(customer.name).toBe('John Doe')
        expect(customer.street).toBe('123 Main St')
        expect(customer.city).toBe('New York')
        expect(customer.state).toBe('NY')
        expect(customer.zipCode).toBe('10001')
        expect(customer.rewardPoints).toBe(0)
    })

    it('Return exception if user not found', async () => {
        const customerRepository = new CustomerRepositoryDatabase()
        const findCustomer = new FindCustomer(customerRepository)
        await expect(() => findCustomer.execute('')).rejects.toThrowError(ExceptionMessages.ErrCustomerNotFound)
    })
})
