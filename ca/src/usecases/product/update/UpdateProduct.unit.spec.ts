import { describe, expect, it, vitest } from 'vitest'
import { Product } from '../../../domain/product/entity/Product'
import { FindProduct } from '../find/FindProduct'
import { UpdateProduct } from './UpdateProduct'

describe('UpdateProduct test', () => {
    const productRepository = {
        create: vitest.fn(),
        findById: vitest.fn(),
        findAll: vitest.fn(),
        update: vitest.fn(),
    }

    it('Update product', async () => {
        const updateProduct = new UpdateProduct(productRepository)
        const findProduct = new FindProduct(productRepository)
        productRepository.findById.mockResolvedValueOnce(new Product('123','Product 1', 10.21))
        await updateProduct.execute({
            productId: '123',
            name: 'Updated Product 1',
            price: 15.99,
        })
        productRepository.findById.mockResolvedValueOnce(new Product('123','Updated Product 1', 15.99))
        const product = await findProduct.execute('123')
        expect(product.id).toBe('123')
        expect(product.name).toBe('Updated Product 1')
        expect(product.price).toBe(15.99)
    })
})
