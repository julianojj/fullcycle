import { beforeEach, describe, expect, it } from 'vitest'
import ProductModel from '../../../infra/database/sequelize/model/ProductModel'
import { ProductRepositoryDatabase } from '../../../infra/product/repository/database/ProductRepositoryDatabase'
import { CreateProduct } from '../create/CreateProduct'
import { FindProduct } from '../find/FindProduct'
import { UpdateProduct } from './UpdateProduct'

describe('UpdateProduct test', () => {
    beforeEach(async () => {
        await ProductModel.sync({ force: true })
    })

    it('Update product', async () => {
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
        const updateProduct = new UpdateProduct(productRepository)
        const updatedInput = {
            productId: output.productId,
            name: 'Updated Test Product',
            price: 15.99
        }
        await updateProduct.execute(updatedInput)
        const updatedProduct = await findProduct.execute(output.productId)
        expect(updatedProduct.id).toBe(output.productId)
        expect(updatedProduct.name).toBe(updatedInput.name)
        expect(updatedProduct.price).toBe(updatedInput.price)
    })
})
