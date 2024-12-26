import { beforeEach, describe, expect, it } from 'vitest'
import ProductModel from '../../../infra/database/sequelize/model/ProductModel'
import { ProductRepositoryDatabase } from '../../../infra/product/repository/database/ProductRepositoryDatabase'
import { FindProduct } from '../find/FindProduct'
import { CreateProduct } from './CreateProduct'

describe('CreateProduct test', () => {
    beforeEach(async () => {
        await ProductModel.sync({ force: true })
    })

    it('Create product', async () => {
        const productRepository = new ProductRepositoryDatabase()
        const createProduct = new CreateProduct(productRepository)
        const findProduct = new FindProduct(productRepository)
        const input = {
            name: 'Test Product',
            price: 10.99
        }
        const output = await createProduct.execute(input)
        const product = await findProduct.execute(output.productId)
        expect(product.id).toBe(output.productId)
        expect(product.name).toBe(input.name)
        expect(product.price).toBe(input.price)
    })
})
