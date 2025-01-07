import { beforeEach, describe, expect, it } from 'vitest'
import { ExceptionMessages } from '../../../exception/ValidationException'
import ProductModel from '../../../infra/database/sequelize/model/ProductModel'
import { ProductRepositoryDatabase } from '../../../infra/product/repository/database/ProductRepositoryDatabase'
import { FindProduct } from './FindProduct'
import { Product } from '../../../domain/product/entity/Product'

describe('FindProduct test', () => {
    beforeEach(async () => {
        await ProductModel.sync({ force: true })
    })

    it('Should find product', async () => {
        const productRepository = new ProductRepositoryDatabase()
        const findProduct = new FindProduct(productRepository)
        await productRepository.create(new Product('123', 'Test Product', 10.99))
        const product = await findProduct.execute('123')
        expect(product.name).toBe('Test Product')
        expect(product.price).toBe(10.99)
    })

    it('Return exception if product not found', async () => {
        const productRepository = new ProductRepositoryDatabase()
        const findProduct = new FindProduct(productRepository)
        await expect(() => findProduct.execute('')).rejects.toThrowError(ExceptionMessages.ErrProductNotFound)
    })
})
