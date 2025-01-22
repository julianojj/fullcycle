import { describe, expect, it, vitest } from 'vitest'
import { AddProductUsecase } from '../usecases/add-product/add-product.usecase'
import { CheckStockUsecase } from '../usecases/check-stock/check-stock.usecase'
import { ProductAdmFacade } from './product.adm.facade'

describe('Product adm facade test', () => {
    it('should add product', async () => {
        const productRepository = {
            add: vitest.fn(),
            find: vitest.fn()
        }
        const addProduct = new AddProductUsecase(productRepository)
        const checkStock = new CheckStockUsecase(productRepository)
        const productAdmFacade = new ProductAdmFacade(addProduct, checkStock)
        const input = {
            name: 'Test Product',
            description: 'This is a test product',
            price: 100
        }
        const output = await productAdmFacade.addProduct(input)
        expect(output).toEqual({
            id: expect.any(String)
        })
        productRepository.find.mockResolvedValue({
            id: output.id,
            name: input.name,
            description: input.description,
            purchasePrice: input.price,
            stock: 0
        })
        const savedProduct = await productRepository.find(output.id)
        expect(savedProduct).toBeDefined()
        expect(savedProduct).toEqual({
            id: output.id,
            name: input.name,
            description: input.description,
            purchasePrice: input.price,
            stock: 0
        })
    })

    it('should check stock', async () => {
        const productRepository = {
            add: vitest.fn(),
            find: vitest.fn()
        }
        productRepository.find.mockResolvedValue({
            id: 'any-id',
            name: 'Test Product',
            description: 'This is a test product',
            purchasePrice: 100,
            stock: 10
        })
        const addProduct = new AddProductUsecase(productRepository)
        const checkStock = new CheckStockUsecase(productRepository)
        const productAdmFacade = new ProductAdmFacade(addProduct, checkStock)

        const output = await productAdmFacade.checkStock({
            productId: 'any-id'
        })
        expect(output.productId).toBe('any-id')
        expect(output.stock).toBe(10)
    })

    it('should throw exception if product not found', async () => {
        const productRepository = {
            add: vitest.fn(),
            find: vitest.fn()
        }
        productRepository.find.mockResolvedValue(null)
        const addProduct = new AddProductUsecase(productRepository)
        const checkStock = new CheckStockUsecase(productRepository)
        const productAdmFacade = new ProductAdmFacade(addProduct, checkStock)

        await expect(productAdmFacade.checkStock({
            productId: 'any-id'
        })).rejects.toThrow('Product not found')
    })
})
