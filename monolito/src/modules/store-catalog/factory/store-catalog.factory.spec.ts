import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import sequelize from '../../product-adm/repository/sequelize'
import ProductModel from '../repository/product.model'
import { StoreCatalogFacadeFactory } from './store-catalog.factory'

describe('Store catalog factory test', () => {
    beforeEach(async () => {
        await sequelize.sync()
    })

    afterEach(async () => {
        await ProductModel.destroy({ where: {} })
    })

    afterAll(async () => {
        await sequelize.close() 
    })


    it('should find product', async () => {
        const storeCatalogFacade = StoreCatalogFacadeFactory.create()
        await ProductModel.create({ id: '1', name: 'Test Product', description: 'This is a test product', salesPrice: 100 })
        const result = await storeCatalogFacade.findProduct('1')
        expect(result.id).toBe('1')
        expect(result.name).toBe('Test Product')
        expect(result.description).toBe('This is a test product')
        expect(result.salesPrice).toBe(100)
    })

    it('should find all products', async () => {
        await ProductModel.bulkCreate([
            { id: '1', name: 'Test Product 1', description: 'This is a test product 1', salesPrice: 100 },
            { id: '2', name: 'Test Product 2', description: 'This is a test product 2', salesPrice: 150 },
        ])
        const storeCatalogFacade = StoreCatalogFacadeFactory.create()
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

    it('should throw error when product not found', async () => {
        const storeCatalogFacade = StoreCatalogFacadeFactory.create()
        await expect(storeCatalogFacade.findProduct('3')).rejects.toThrow('product not found')
    })
})