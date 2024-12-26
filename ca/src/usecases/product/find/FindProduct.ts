import { ProductRepositoryInterface } from '../../../domain/product/repository/ProductRepositoryInterface'
import { ExceptionMessages } from '../../../exception/ValidationException'

export class FindProduct {
    constructor(
        private readonly productRepository: ProductRepositoryInterface
    ) { }

    async execute(productId: string): Promise<FindProductOutput> {
        const product = await this.productRepository.findById(productId)
        if (!product) throw ExceptionMessages.ErrProductNotFound
        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}

export type FindProductOutput = {
    id: string,
    name: string,
    price: number
}
