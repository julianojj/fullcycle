import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import ProductModel from '../repository/product.model'
import { ProductRepository } from '../repository/product.repository'
import sequelize from '../repository/sequelize'
import { FindAllProductsUsecase } from '../usecases/find-all-products/find-all-products.usecase'
import { FindProductUsecase } from '../usecases/find-product/find-product.usecase'
import { StoreCatalogFacade } from './store-catalog.facade'

describe('Store catalog facade test', () => {

    beforeEach(async () => {
        await sequelize.sync()
    })

    afterEach(async () => {
        await ProductModel.destroy({ where: {} })
    })

    afterAll(async () => {
        await sequelize.close() 
    })

    it('should find all products', async () => {
        await ProductModel.bulkCreate([
            { id: '1', name: 'Test Product 1', description: 'This is a test product 1', salesPrice: 100 },
            { id: '2', name: 'Test Product 2', description: 'This is a test product 2', salesPrice: 150 },
        ])
        const productRepository = new ProductRepository()
        const findAllProducts = new FindAllProductsUsecase(productRepository)
        const findProduct = new FindProductUsecase(productRepository)
        const storeCatalogFacade = new StoreCatalogFacade(findProduct, findAllProducts)
        const result = await storeCatalogFacade.findAllProducts()
        expect(result).toHaveLength(2)
        expect(result[0].id).toBe('1')
        expect(result[0].name).toBe('Test Product 1')
        expect(result[0].description).toBe('This is a test product 1')
        expect(result[0].salesPrice).toBe(100)
        expect(result[1].id).toBe('2')
        expect(result[1].name).toBe('Test Product 2')
        expect(result[1].description).toBe('This is a test product 2')
        expect(result[1].salesPrice).toBe(150)
    })

    it('should find product', async () => {
        await ProductModel.create({ id: '1', name: 'Test Product', description: 'This is a test product', salesPrice: 100 })
        const productRepository = new ProductRepository()
        const findAllProducts = new FindAllProductsUsecase(productRepository)
        const findProduct = new FindProductUsecase(productRepository)
        const storeCatalogFacade = new StoreCatalogFacade(findProduct, findAllProducts)
        const result = await storeCatalogFacade.findProduct('1')
        expect(result.id).toBe('1')
        expect(result.name).toBe('Test Product')
        expect(result.description).toBe('This is a test product')
        expect(result.salesPrice).toBe(100)
    })

    it('should return exception if product not found', async () => {
        const productRepository = new ProductRepository()
        const findAllProducts = new FindAllProductsUsecase(productRepository)
        const findProduct = new FindProductUsecase(productRepository)
        const storeCatalogFacade = new StoreCatalogFacade(findProduct, findAllProducts)
        await expect(storeCatalogFacade.findProduct('1')).rejects.toThrow('product not found')  
    })
})
