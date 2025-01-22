import { describe, expect, it, vitest } from 'vitest'
import { CheckStockUsecase } from './check-stock.usecase'

describe('Check stock usecase unit test', () => {
    it('should check stock', async () => {
        const productRepository = {
            add: vitest.fn(),
            find: vitest.fn()
        }
        productRepository.find.mockResolvedValue({
            id: '1',
            name: 'Test Product',
            description: 'This is a test product',
            purchasePrice: 100,
            stock: 10
        })
        const checkStock = new CheckStockUsecase(productRepository)
        const output = await checkStock.execute('1')
        expect(output.productId).toBe('1')
        expect(output.stock).toBe(10)
    })

    it('should return exception if product not found', async () => {
        const productRepository = {
            add: vitest.fn(),
            find: vitest.fn()
        }
        productRepository.find.mockResolvedValue(null)
        const checkStock = new CheckStockUsecase(productRepository)
        await expect(checkStock.execute('1')).rejects.toThrow('Product not found')
    })
})
