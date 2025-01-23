import { UseCase } from '../../../@shared/usecases/use-case.interface'
import { ProductGateway } from '../../gateway/product.gateway'
import { FindProduct } from './find-product.dto'

export class FindProductUsecase implements UseCase {
    private _productGateway: ProductGateway

    constructor(
        productGateway: ProductGateway
    ) {
        this._productGateway = productGateway
    }

    async execute(productId: string): Promise<FindProduct> {
        const product = await this._productGateway.find(productId)
        if (!product) throw new Error('product not found')  
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        }
    }
}
