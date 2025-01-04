import { randomUUID } from 'crypto'
import { Product } from '../../../domain/product/entity/Product'
import { ProductRepositoryInterface } from '../../../domain/product/repository/ProductRepositoryInterface'
import { CreateProductInput, CreateProductOutput } from './CreateProduct.dto'

export class CreateProduct {
    constructor(
        private readonly productRepository: ProductRepositoryInterface
    ) {}

    async execute(input: CreateProductInput): Promise<CreateProductOutput> {
        const product = new Product(
            randomUUID(),
            input.name,
            input.price
        )
        await this.productRepository.create(product)
        return {
            productId: product.id
        }
    }
}
