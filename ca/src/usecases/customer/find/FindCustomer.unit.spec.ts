import { describe, expect, it, vitest } from 'vitest'
import { ExceptionMessages } from '../../../exception/ValidationException'
import { FindCustomer } from './FindCustomer'

describe('FindCustomer test', () => {

    const customerRepository = {
        create: vitest.fn(),
        findById: vitest.fn(),
        findAll: vitest.fn(),
        update: vitest.fn()
    }

    it('Should find customer', async () => {
        const findCustomer = new FindCustomer(customerRepository)
        customerRepository.findById.mockResolvedValueOnce({
            id: '123',
            name: 'John Doe',
            address: {
                street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            },
            rewardPoints: 0,
        })
        const customer = await findCustomer.execute('123')
        expect(customer.id).toBe('123')
        expect(customer.name).toBe('John Doe')
        expect(customer.street).toBe('123 Main St') 
        expect(customer.city).toBe('New York')
        expect(customer.state).toBe('NY')   
        expect(customer.zipCode).toBe('10001')
        expect(customer.rewardPoints).toBe(0)
    })

    it('Return exception if user not found', async () => {
        const findCustomer = new FindCustomer(customerRepository)
        await expect(() => findCustomer.execute('')).rejects.toThrowError(ExceptionMessages.ErrCustomerNotFound)
    })
})
