import { UseCase } from '../../@shared/usecases/use-case.interface'
import { FindAllProductsFacadeOutput, FindProductFacadeOutput, StoreCatalogFacadeInterface } from './store-catalog.facade.interface'

export class StoreCatalogFacade implements StoreCatalogFacadeInterface {
    private _findProduct: UseCase
    private _findAllProducts: UseCase

    constructor(
        findProduct: UseCase,
        findAllProducts: UseCase
    ) {
        this._findProduct = findProduct
        this._findAllProducts = findAllProducts
    }

    async findAllProducts(): Promise<FindAllProductsFacadeOutput> {
        return this._findAllProducts.execute(null)
    }

    async findProduct(productId: string): Promise<FindProductFacadeOutput> {
        return this._findProduct.execute(productId)
    }
}
