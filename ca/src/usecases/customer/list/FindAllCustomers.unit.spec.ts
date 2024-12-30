import { describe, expect, it, vitest } from 'vitest'
import { FindAllCustomers } from './FindAllCustomers'

describe('FindAllCustomers test', () => {
    const customerRepository = {
        create: vitest.fn(),
        findById: vitest.fn(),
        findAll: vitest.fn(),
        update: vitest.fn()
    }

    it('Should return all customers', async () => {
        const findAllCustomers = new FindAllCustomers(customerRepository)
        customerRepository.findAll.mockResolvedValueOnce([
            {
                id: '1',
                name: 'John Doe',
                address: {
                    street: '123 Main St',
                    city: 'New York',
                    state: 'NY',
                    zipCode: '10001',
                }
            },
            {
                id: '2',
                name: 'Jane Doe',
                address: {
                    street: '456 Elm St',
                    city: 'Los Angeles',
                    state: 'CA',
                    zipCode: '90001',
                }
            }
        ])
        const customers = await findAllCustomers.execute()
        expect(customers).toHaveLength(2)
    })
})