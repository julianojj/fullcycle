import { describe, expect, it, vitest } from 'vitest'
import { FindAllProductsUsecase } from './find-all-products.usecase'

describe('Find all products test', () => {
    it('should return all products', async() => {
        const productRepository = {
            find: vitest.fn(),
            findAll: vitest.fn()
        }
        const products = [
            { id: '1', name: 'Test Product 1', description: 'Test Description 1', salesPrice: 10.99 },
            { id: '2', name: 'Test Product 2', description: 'Test Description 2', salesPrice: 15.99 }
        ]
        productRepository.findAll.mockResolvedValue(products)
        const findAllProducts = new FindAllProductsUsecase(productRepository)
        const output = await findAllProducts.execute()    
        expect(output).toHaveLength(2)
        expect(output).toEqual(products)
    })

    it('not should return products if empty', async () => {
        const productRepository = {
            find: vitest.fn(),
            findAll: vitest.fn()
        }
        productRepository.findAll.mockResolvedValue([])
        const findAllProducts = new FindAllProductsUsecase(productRepository)
        const output = await findAllProducts.execute()    
        expect(output).toEqual([])
    })
})
