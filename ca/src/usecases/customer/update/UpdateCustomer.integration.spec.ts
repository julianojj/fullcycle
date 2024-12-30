import { beforeEach, describe, expect, it } from 'vitest'
import { Address } from '../../../domain/customer/entity/Customer'
import CustomerFactory from '../../../domain/customer/factory/CustomerFactory'
import { CustomerRepositoryDatabase } from '../../../infra/customer/repository/database/CustomerRepositoryDatabase'
import CustomerModel from '../../../infra/database/sequelize/model/CustomerModel'
import { UpdateCustomer } from './UpdateCustomer'

describe('UpdateCustomer test', () => {

    beforeEach(async () => {
        await CustomerModel.sync({ force: true })
    })

    it('Should update customer', async () => {
        const customerRepository = new CustomerRepositoryDatabase()
        const input = CustomerFactory.create('John Doe', 'Street', 'City', 'State', 'ZipCode')
        await customerRepository.create(input)
        const customer = await customerRepository.findById(input.id)
        expect(customer.name).toBe('John Doe')
        expect(customer.address.street).toBe('Street')
        expect(customer.address.city).toBe('City')
        expect(customer.address.state).toBe('State')
        expect(customer.address.zipCode).toBe('ZipCode')
        expect(customer.rewardPoints).toBe(0)
        const updateCustomer = new UpdateCustomer(customerRepository)
        input.updateName('Jhon')
        input.updateAddress(new Address('Street 2', 'City 2', 'State 2', 'Zip Code 2'))
        input.addRewardPoints(10)
        await updateCustomer.execute({
            id: input.id,
            name: input.name,
            street: input.address.street,
            city: input.address.city,
            state: input.address.state,
            zipCode: input.address.zipCode,
            rewardPoints: input.rewardPoints,
        })
        const updatedCustomer = await customerRepository.findById(input.id)
        expect(updatedCustomer.name).toBe('Jhon')
        expect(updatedCustomer.address.street).toBe('Street 2')
        expect(updatedCustomer.address.city).toBe('City 2')
        expect(updatedCustomer.address.state).toBe('State 2')
        expect(updatedCustomer.address.zipCode).toBe('Zip Code 2')
        expect(updatedCustomer.rewardPoints).toBe(10)
    })

    it('Not should update customer if not found', async () => {
        const customerRepository = new CustomerRepositoryDatabase()
        const updateCustomer = new UpdateCustomer(customerRepository)
        const input = {
            id: 'non-existing-id',
            name: 'John Doe',
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            rewardPoints: 0,
        }
        await expect(() => updateCustomer.execute(input)).rejects.toThrow('Customer not found')
    })
})
