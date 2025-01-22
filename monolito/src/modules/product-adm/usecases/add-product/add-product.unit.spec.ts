import { describe, expect, it, vitest } from 'vitest'
import { AddProductUsecase } from './add-product.usecase'

describe('Add product usecase unit test', () => {
    it('should add product', async () => {
        const productRepository = {
            add: vitest.fn(),
            find: vitest.fn()
        }
        const addProduct = new AddProductUsecase(productRepository)
        const input = {
            name: 'Test Product',
            description: 'This is a test product',
            price: 100
        }
        const output = await addProduct.execute(input)
        expect(output).toEqual({
            id: expect.any(String)
        })
        productRepository.find.mockResolvedValue({
            id: output.id,
            name: input.name,
            description: input.description,
            price: input.price,
            stock: 0
        })
        const product = await productRepository.find(output.id)
        expect(product).toBeDefined()
        expect(product).toEqual({
            id: output.id,
            name: input.name,
            description: input.description,
            price: input.price,
            stock: 0
        })
    })
})
