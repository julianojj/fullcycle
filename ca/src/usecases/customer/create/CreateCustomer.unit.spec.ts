import { describe, expect, it, vitest } from 'vitest'
import { FindCustomer } from '../find/FindCustomer'
import CreateCustomer from './CreateCustomer'

describe('CreateCustomer test', () => {
    const customerRepository = {
        create: vitest.fn(),
        findById: vitest.fn(),
        findAll: vitest.fn(),
        update: vitest.fn(),
    }

    it('Should create a new customer', async () => {
        const createCustomer = new CreateCustomer(customerRepository)
        const findCustomer = new FindCustomer(customerRepository)
        const { customerId } = await createCustomer.execute({
            name: 'John Doe',
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001'
        })
        customerRepository.findById.mockResolvedValueOnce({
            id: customerId,
            name: 'John Doe',
            address: {
                street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            },
            rewardPoints: 0,
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
