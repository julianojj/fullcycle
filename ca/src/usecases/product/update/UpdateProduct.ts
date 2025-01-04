import { ProductRepositoryInterface } from '../../../domain/product/repository/ProductRepositoryInterface'
import { UpdateProductInput } from './UpdateProduct.dto'

export class UpdateProduct {
    constructor(
        private readonly productRepository: ProductRepositoryInterface
    ) { }

    async execute(input: UpdateProductInput): Promise<void> {
        const existingProduct = await this.productRepository.findById(input.productId)
        if (!existingProduct) throw new Error('Product not found')
        existingProduct.updateName(input.name)
        existingProduct.updatePrice(input.price)
        await this.productRepository.update(existingProduct)
    }
}
