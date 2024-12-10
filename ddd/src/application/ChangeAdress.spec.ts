import { beforeEach, describe, expect, it } from 'vitest'
import CustomerModel from '../infra/database/sequelize/model/CustomerModel'
import EnviaConsoleLogHandler from '../infra/customer/event/EnviaConsoleLogHandler'
import { CustomerRepositoryDatabase } from '../infra/customer/repository/database/CustomerRepositoryDatabase'
import { EventObserver } from '../infra/event/EventObserver'
import ChangeAddress from './ChangeAddress'
import CreateCustomer from './CreateCustomer'

describe('ChangeAddress test', () => {

    beforeEach(async () => {
        await CustomerModel.sync({ force: true })
    })

    it('Should change adress', async () => {
        const observer = new EventObserver()
        const handler = new EnviaConsoleLogHandler()
        observer.register(handler)
        const customerRepository = new CustomerRepositoryDatabase()
        const createCustomer = new CreateCustomer(customerRepository, observer)
        const changeAddress = new ChangeAddress(customerRepository, observer)
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
        await changeAddress.execute({
            customerId,
            street: '456 Elm St',
            city: 'Anytown',
            state: 'CA',
            zipCode: '12345'
        })
        const updatedCustomer = await customerRepository.findById(customerId)
        expect(updatedCustomer.id).toBe(customerId)
        expect(updatedCustomer.address.street).toBe('456 Elm St')
        expect(updatedCustomer.address.city).toBe('Anytown')
        expect(updatedCustomer.address.state).toBe('CA')
        expect(updatedCustomer.address.zipCode).toBe('12345')
        expect(updatedCustomer.rewardPoints).toBe(0)
    })
})
