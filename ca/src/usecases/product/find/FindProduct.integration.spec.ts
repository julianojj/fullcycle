import { describe, expect, it, vitest } from 'vitest'
import { ExceptionMessages } from '../../../exception/ValidationException'
import { FindProduct } from './FindProduct'

describe('FindProduct test', () => {
    const productRepository = {
        create: vitest.fn(),
        findById: vitest.fn(),
        findAll: vitest.fn(),
        update: vitest.fn(),
    }
    
    it('Return exception if product not found', async () => {
        const findProduct = new FindProduct(productRepository)
        await expect(() => findProduct.execute('')).rejects.toThrowError(ExceptionMessages.ErrProductNotFound)
    })
})
