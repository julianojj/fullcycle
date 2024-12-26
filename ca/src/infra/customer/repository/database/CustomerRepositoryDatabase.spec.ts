import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { Address, Customer } from '../../../../domain/customer/entity/Customer'
import CustomerModel from '../../../database/sequelize/model/CustomerModel'
import { CustomerRepositoryDatabase } from './CustomerRepositoryDatabase'

describe('Order Repository Database Test', () => {

    beforeEach(async () => {
        await CustomerModel.sync({ force: true })
    })

    it('Create customer', async () => {
        const customerRepositoryDatabase = new CustomerRepositoryDatabase()
        const input = new Customer(randomUUID(), 'John Doe', new Address('123 Main St', 'New York', 'NY', '10001'))
        await customerRepositoryDatabase.create(input)
        const customer = await customerRepositoryDatabase.findById(input.id)
        expect(customer).toEqual(input)
    })

    it('Find all customers', async () => {
        const customerRepositoryDatabase = new CustomerRepositoryDatabase()
        const customer1 = new Customer(randomUUID(), 'John Doe', new Address('123 Main St', 'New York', 'NY', '10001'))
        const customer2 = new Customer(randomUUID(), 'John Doe', new Address('456 Elm St', 'Los Angeles', 'CA', '90001'))
        await customerRepositoryDatabase.create(customer1)
        await customerRepositoryDatabase.create(customer2)
        const customers = await customerRepositoryDatabase.findAll()
        expect(customers).toHaveLength(2)
        expect(customers).toContainEqual(customer1)
        expect(customers).toContainEqual(customer2)
    })

    it('Update customer', async () => {
        const customerRepositoryDatabase = new CustomerRepositoryDatabase()
        const customer1 = new Customer(randomUUID(), 'John Doe', new Address('123 Main St', 'New York', 'NY', '10001'))
        await customerRepositoryDatabase.create(customer1)
        customer1.updateAddress(new Address('789 Oak St', 'Los Angeles', 'CA', '90001'))
        await customerRepositoryDatabase.update(customer1)
        const customer = await customerRepositoryDatabase.findById(customer1.id)
        expect(customer).toEqual(customer1)
        expect(customer.address.street).not.toBe('123 Main St')
        expect(customer.address.city).not.toBe('New York')
        expect(customer.address.state).not.toBe('NY')
        expect(customer.address.zipCode).not.toBe('10001')
    })
})
