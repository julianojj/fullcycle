import { beforeEach, describe, expect, it } from 'vitest'
import ProductModel from '../../../infra/database/sequelize/model/ProductModel'
import { ProductRepositoryDatabase } from '../../../infra/product/repository/database/ProductRepositoryDatabase'
import { CreateProduct } from '../create/CreateProduct'
import { FindAllProducts } from './FindAllProducts'

describe('FindAllProducts test', () => {
    beforeEach(async () => {
        await ProductModel.sync({ force: true })
    })

    it('Should return all products', async () => {
        const productRepository = new ProductRepositoryDatabase()
        const findAllProducts = new FindAllProducts(productRepository)
        const createProduct = new CreateProduct(productRepository)
        await createProduct.execute({
            name: 'Test Product 1',
            price: 10.99
        })
        await createProduct.execute({
            name: 'Test Product 2',
            price: 20.99
        })
        const output = await findAllProducts.execute()
        expect(output).toHaveLength(2)
        expect(output[0].name).toBe('Test Product 1')
        expect(output[0].price).toBe(10.99)
        expect(output[1].name).toBe('Test Product 2')
        expect(output[1].price).toBe(20.99)
    })
})
