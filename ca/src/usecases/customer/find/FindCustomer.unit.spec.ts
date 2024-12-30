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

    it('Return exception if user not found', async () => {
        const findCustomer = new FindCustomer(customerRepository)
        await expect(() => findCustomer.execute('')).rejects.toThrowError(ExceptionMessages.ErrCustomerNotFound)
    })
})
