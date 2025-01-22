import { afterAll, beforeEach, describe, expect, it } from 'vitest'
import ProductModel from '../repository/product.model'
import sequelize from '../repository/sequelize'
import { ProductAdmFacadeFactory } from './product-adm.factory'

describe('ProductAdmFactory test', () => {
    beforeEach(async () => {
        await sequelize.sync()
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should create product adm facade', async () => {
        const productAdmFacadeFactory = ProductAdmFacadeFactory.create()
        const output = await productAdmFacadeFactory.addProduct({
            name: 'Test Product',
            description: 'This is a test product',
            price: 100
        })
        const product = await ProductModel.findOne({
            where: {
                id: output.id
            }
        })
        expect(product).toBeDefined()
        expect(product.id).toBe(output.id)
        expect(product.name).toBe('Test Product')
        expect(product.description).toBe('This is a test product')
        expect(product.purchasePrice).toBe(100)
        expect(product.stock).toBe(0)
        expect(product.createdAt).toBeDefined()
        expect(product.updatedAt).toBeDefined()
    })

    it('should check stock', async () => {
        const product = await ProductModel.create({
            id: '1',
            name: 'Test Product',
            description: 'This is a test product',
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        const productAdmFacadeFactory = ProductAdmFacadeFactory.create()
        const output = await productAdmFacadeFactory.checkStock({
            productId: product.id
        })
        expect(output.productId).toBe(product.id)
        expect(output.stock).toBe(10)
    })

    it('should throw exception if product not found', async () => {
        const productAdmFacadeFactory = ProductAdmFacadeFactory.create()
        await expect(productAdmFacadeFactory.checkStock({
            productId: 'any-id'
        })).rejects.toThrow('Product not found')
    })
})
