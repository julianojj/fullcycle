import { describe, expect, it, vitest } from 'vitest'
import { FindProductUsecase } from './find-product.usecase'

describe('Find product usecase unit test', () => {
    it('should find product', async () => {
        const productRepository = {
            add: vitest.fn(),
            find: vitest.fn()
        }
        productRepository.find.mockResolvedValue({
            id: 'any-id',
            name: 'any-name',
            description: 'any-description',
            purchasePrice: 200,
            stock: 10,
        })
        const findProduct = new FindProductUsecase(productRepository)
        const output = await findProduct.execute('any-id')
        expect(output.id).toBe('any-id')
        expect(output.name).toBe('any-name')
        expect(output.description).toBe('any-description')
        expect(output.price).toBe(200)
        expect(output.stock).toBe(10)
    })

    it('should throw error when product not found', async () => {
        const productRepository = {
            add: vitest.fn(),
            find: vitest.fn()
        }
        productRepository.find.mockResolvedValue(null)
        const findProduct = new FindProductUsecase(productRepository)
        await expect(findProduct.execute('any-id')).rejects.toThrow('product not found')
    })
})
