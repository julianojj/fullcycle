import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import ProductModel from './product.model'
import { ProductRepository } from './product.repository'
import sequelize from './sequelize'

describe('Product repository test', () => {
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
        await ProductModel.create({
            id: '1',
            name: 'Test Product',
            description: 'This is a test product',
            salesPrice: 100
        })
        const productRepository = new ProductRepository()
        const product = await productRepository.find('1')
        expect(product.id).toBe('1')
        expect(product.name).toBe('Test Product')       
        expect(product.description).toBe('This is a test product')
        expect(product.salesPrice).toBe(100)
    })

    it('should find all products', async () => {
        await ProductModel.bulkCreate([
            { id: '1', name: 'Test Product 1', description: 'This is a test product 1', salesPrice: 100 },
            { id: '2', name: 'Test Product 2', description: 'This is a test product 2', salesPrice: 150 },
        ])
        const productRepository = new ProductRepository()
        const products = await productRepository.findAll()
        expect(products.length).toBe(2)
        expect(products[0].id).toBe('1')
        expect(products[0].name).toBe('Test Product 1')
        expect(products[0].description).toBe('This is a test product 1')
        expect(products[0].salesPrice).toBe(100)
        expect(products[1].id).toBe('2')
        expect(products[1].name).toBe('Test Product 2')
        expect(products[1].description).toBe('This is a test product 2')
        expect(products[1].salesPrice).toBe(150)
    })

    it('should return null if product not found', () => {
        const productRepository = new ProductRepository()
        return expect(productRepository.find('1')).resolves.toBeNull()
    })
})
