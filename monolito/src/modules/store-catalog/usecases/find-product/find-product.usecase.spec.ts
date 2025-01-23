import { describe, expect, it, vitest } from 'vitest'
import { FindProductUsecase } from './find-product.usecase'

describe('Find product test', () => {
    it('should find product', async() => {
        const productRepository = {
            find: vitest.fn(),
            findAll: vitest.fn()
        }
        productRepository.find.mockResolvedValue({ id: '1', name: 'Test Product 1', description: 'Test Description 1', salesPrice: 10.99 })
        const findProduct = new FindProductUsecase(productRepository)
        const product = await findProduct.execute('1')
        expect(product).toEqual({ id: '1', name: 'Test Product 1', description: 'Test Description 1', salesPrice: 10.99 })
    })

    it('should return exception if product not found', async () => {
        const productRepository = {
            find: vitest.fn(),
            findAll: vitest.fn()
        }
        const findProduct = new FindProductUsecase(productRepository)
        await expect(findProduct.execute('1')).rejects.toThrow('product not found')
    })
})
