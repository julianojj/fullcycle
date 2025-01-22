import { ProductAdmFacade } from '../facade/product.adm.facade'
import { ProductRepository } from '../repository/product.repository'
import { AddProductUsecase } from '../usecases/add-product/add-product.usecase'
import { CheckStockUsecase } from '../usecases/check-stock/check-stock.usecase'

export class ProductAdmFacadeFactory {
    static create(): ProductAdmFacade {
        const productRepository = new ProductRepository()
        const addProductUsecase = new AddProductUsecase(productRepository)
        const checkStockUsecase = new CheckStockUsecase(productRepository)
        return new ProductAdmFacade(addProductUsecase, checkStockUsecase)
    }
}
