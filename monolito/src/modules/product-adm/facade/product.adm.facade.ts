import { UseCase } from '../../@shared/usecases/use-case.interface'
import { AddProductFacadeInput, AddProductFacadeOutput, CheckStockFacadeInput, CheckStockFacadeOutput, ProductAdmFacadeInterface } from './product-adm.facade.interface'

export class ProductAdmFacade implements ProductAdmFacadeInterface {
    private _addProduct: UseCase
    private _checkStock: UseCase

    constructor(
        addProduct: UseCase,
        checkStock: UseCase
    ) {
        this._addProduct = addProduct
        this._checkStock = checkStock
    }

    async addProduct(input: AddProductFacadeInput): Promise<AddProductFacadeOutput> {
        return this._addProduct.execute(input)
    }

    async checkStock(input: CheckStockFacadeInput): Promise<CheckStockFacadeOutput> {
        return this._checkStock.execute(input.productId)
    }   
}
