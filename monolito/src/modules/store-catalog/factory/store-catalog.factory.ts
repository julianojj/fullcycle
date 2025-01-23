import { StoreCatalogFacade } from '../facade/store-catalog.facade'
import { ProductRepository } from '../repository/product.repository'
import { FindAllProductsUsecase } from '../usecases/find-all-products/find-all-products.usecase'
import { FindProductUsecase } from '../usecases/find-product/find-product.usecase'

export class StoreCatalogFacadeFactory {
    static create(): StoreCatalogFacade {
        const productRepository = new ProductRepository()
        const findProduct = new FindProductUsecase(productRepository)
        const findAllProductsUsecase = new FindAllProductsUsecase(productRepository)
        return new StoreCatalogFacade(findProduct, findAllProductsUsecase)
    }
}
