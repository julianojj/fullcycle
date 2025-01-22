import { UseCase } from '../../../@shared/usecases/use-case.interface'
import { Product } from '../../domain/product.entity'
import { ProductGateway } from '../../gateway/product.gateway'
import { AddProductInput, AddProductOutput } from './add-product.dto'

export class AddProductUsecase implements UseCase {
    private _productGateway: ProductGateway

    constructor(
        productGateway: ProductGateway
    ) {
        this._productGateway = productGateway
    }

    async execute(input: AddProductInput): Promise<AddProductOutput> {
        const props = {
            name: input.name,
            description: input.description,
            purchasePrice: input.price,
            stock: 0,
        }
        const product = new Product(props)
        await this._productGateway.add(product)
        return {
            id: product.id
        }
    }
}
