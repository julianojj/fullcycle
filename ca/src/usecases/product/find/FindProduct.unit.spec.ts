import { beforeEach, describe, expect, it } from 'vitest'
import { ExceptionMessages } from '../../../exception/ValidationException'
import ProductModel from '../../../infra/database/sequelize/model/ProductModel'
import { ProductRepositoryDatabase } from '../../../infra/product/repository/database/ProductRepositoryDatabase'
import { FindProduct } from './FindProduct'

describe('FindProduct test', () => {
    beforeEach(async () => {
        await ProductModel.sync({ force: true })
    })

    it('Return exception if product not found', async () => {
        const productRepository = new ProductRepositoryDatabase()
        const findProduct = new FindProduct(productRepository)
        await expect(() => findProduct.execute('')).rejects.toThrowError(ExceptionMessages.ErrProductNotFound)
    })
})
