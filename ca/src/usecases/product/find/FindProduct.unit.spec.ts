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

    it('Should find product', async () => {
        const findProduct = new FindProduct(productRepository)
        productRepository.findById.mockResolvedValueOnce({ id: '123', name: 'Test Product', price: 10.99 })
        const product = await findProduct.execute('123')
        expect(product.id).toBe('123')
        expect(product.name).toBe('Test Product')
        expect(product.price).toBe(10.99)       
    })
    
    it('Return exception if product not found', async () => {
        const findProduct = new FindProduct(productRepository)
        await expect(() => findProduct.execute('')).rejects.toThrowError(ExceptionMessages.ErrProductNotFound)
    })
})
