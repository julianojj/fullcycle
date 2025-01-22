import { afterAll, beforeEach, describe, expect, it } from 'vitest'
import { Product } from '../domain/product.entity'
import { ProductRepository } from './product.repository'
import sequelize from './sequelize'

describe('Product repository test', () => {
    beforeEach(async () => {
        await sequelize.sync()
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should add product', async () => {
        const productRepository = new ProductRepository()
        const product = new Product({
            name: 'Test Product',
            description: 'This is a test product',
            purchasePrice: 100,
            stock: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        await productRepository.add(product)
        const savedProduct = await productRepository.find(product.id)
        expect(savedProduct).toBeDefined()
        expect(savedProduct.id).toBe(product.id)
        expect(savedProduct.name).toBe(product.name)
        expect(savedProduct.description).toBe(product.description)
        expect(savedProduct.purchasePrice).toBe(product.purchasePrice)
        expect(savedProduct.stock).toBe(product.stock)
        expect(savedProduct.createdAt).toStrictEqual(product.createdAt)
        expect(savedProduct.updatedAt).toStrictEqual(product.updatedAt)
    })

    it('should return null if product not found', async () => {
        const productRepository = new ProductRepository()
        const result = await productRepository.find('non-existing-id')
        expect(result).toBeNull()
    })
})
