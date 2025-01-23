import { UseCase } from '../../../@shared/usecases/use-case.interface'
import { ProductGateway } from '../../gateway/product.gateway'
import { FindAllProductsOutput } from './find-all-products.dto'

export class FindAllProductsUsecase implements UseCase {
    private _productGateway: ProductGateway

    constructor(
        productGateway: ProductGateway
    ) {
        this._productGateway = productGateway
    }

    async execute(): Promise<FindAllProductsOutput[]> {
        const products = await this._productGateway.findAll()
        const output: FindAllProductsOutput[] = []
        for (const product of products) {
            output.push({
                id: product.id,
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice
            })
        }
        return output
    }
}
