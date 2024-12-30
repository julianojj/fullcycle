import { describe, expect, it, vitest } from 'vitest'
import { FindProduct } from '../find/FindProduct'
import { CreateProduct } from './CreateProduct'

describe('CreateProduct test', () => {
    const productRepository = {
        create: vitest.fn(),
        findById: vitest.fn(),
        findAll: vitest.fn(),
        update: vitest.fn(),
    }

    it('Create product', async () => {
        const createProduct = new CreateProduct(productRepository)
        const findProduct = new FindProduct(productRepository)
        const input = {
            name: 'Test Product',
            price: 10.99
        }
        await createProduct.execute(input)
        productRepository.findById.mockResolvedValueOnce({ id: '123', name: 'Test Product', price: 10.99 })
        const product = await findProduct.execute('123')
        expect(product.id).toBe('123')
        expect(product.name).toBe(input.name)
        expect(product.price).toBe(input.price)
    })
})
