import { beforeEach, describe, expect, it } from 'vitest'
import CustomerModel from '../infra/database/sequelize/model/CustomerModel'
import { CustomerRepositoryDatabase } from '../infra/repository/database/CustomerRepositoryDatabase'
import CreateCustomer from './CreateCustomer'
import { EventObserver } from '../infra/event/EventObserver'
import EnviaConsoleLog1Handler from '../infra/event/EnviaConsoleLog1Handler'
import EnviaConsoleLog2Handler from '../infra/event/EnviaConsoleLog2Handler'

describe('CreateCustomer test', () => {

    beforeEach(async () => {
        await CustomerModel.sync({ force: true })
    })

    it('Should create a new customer', async () => {
        const observer = new EventObserver()
        const handler = new EnviaConsoleLog1Handler()
        const handler2 = new EnviaConsoleLog2Handler()
        observer.register(handler)
        observer.register(handler2)
        const customerRepository = new CustomerRepositoryDatabase()
        const createCustomer = new CreateCustomer(customerRepository, observer)
        const { customerId } = await createCustomer.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001'
        })
        const customer = await customerRepository.findById(customerId)
        expect(customer.id).toBe(customerId)
        expect(customer.address.street).toBe('123 Main St')
        expect(customer.address.city).toBe('New York')
        expect(customer.address.state).toBe('NY')
        expect(customer.address.zipCode).toBe('10001')
        expect(customer.rewardPoints).toBe(0)
    })
})
