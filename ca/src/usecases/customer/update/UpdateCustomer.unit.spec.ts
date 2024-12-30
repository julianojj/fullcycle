import { describe, expect, it, vitest } from 'vitest'
import { UpdateCustomer } from './UpdateCustomer'

describe('UpdateCustomer test', () => {

    const customerRepository = {
        create: vitest.fn(),
        findById: vitest.fn(),
        findAll: vitest.fn(),
        update: vitest.fn()
    }

    it('Should update customer', async () => {
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
            updateName: vitest.fn(),
            updateAddress: vitest.fn(),
            addRewardPoints: vitest.fn(),
        })
        const updateCustomer = new UpdateCustomer(customerRepository)
        await updateCustomer.execute({
            id: '123',
            name: 'Jhon',
            street: 'Street 2',
            city: 'City 2',
            state: 'State 2',
            zipCode: 'Zip Code 2',
            rewardPoints: 10,
        })
        customerRepository.findById.mockResolvedValueOnce({
            id: '123',
            name: 'Jhon',
            address: {
                street: 'Street 2',
                city: 'City 2',
                state: 'State 2',
                zipCode: 'Zip Code 2',
            },
            rewardPoints: 10,
            updateName: vitest.fn(),
            updateAddress: vitest.fn(),
            addRewardPoints: vitest.fn(),   
        })
        const updatedCustomer = await customerRepository.findById('123')
        expect(updatedCustomer.name).toBe('Jhon')
        expect(updatedCustomer.address.street).toBe('Street 2')
        expect(updatedCustomer.address.city).toBe('City 2')
        expect(updatedCustomer.address.state).toBe('State 2')
        expect(updatedCustomer.address.zipCode).toBe('Zip Code 2')
        expect(updatedCustomer.rewardPoints).toBe(10)
    })

    it('Not should update customer if not found', async () => {
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
