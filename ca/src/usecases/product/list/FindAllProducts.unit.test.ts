import { describe, expect, it, vitest } from 'vitest'
import { CreateProduct } from '../create/CreateProduct'
import { FindAllProducts } from './FindAllProducts'

describe('FindAllProducts test', () => {
    const productRepository = {
        create: vitest.fn(),
        findById: vitest.fn(),
        findAll: vitest.fn(),
        update: vitest.fn(),
    }

    it('Should return all products', async () => {
        const findAllProducts = new FindAllProducts(productRepository)
        const createProduct = new CreateProduct(productRepository)
        await createProduct.execute({
            name: 'Test Product 1',
            price: 10.99
        })
        await createProduct.execute({
            name: 'Test Product 2',
            price: 20.99
        })
        productRepository.findAll.mockResolvedValueOnce([
            {
                id: '1',
                name: 'Test Product 1',
                price: 10.99,
            },
            {
                id: '2',
                name: 'Test Product 2',
                price: 20.99,
            }
        ])
        const output = await findAllProducts.execute()
        expect(output).toHaveLength(2)
        expect(output[0].name).toBe('Test Product 1')
        expect(output[0].price).toBe(10.99)
        expect(output[1].name).toBe('Test Product 2')
        expect(output[1].price).toBe(20.99)
    })
})
