import { ProductRepositoryInterface } from '../../../domain/product/repository/ProductRepositoryInterface'


export class FindAllProducts {
    constructor(
        private readonly productRepository: ProductRepositoryInterface
    ) { }

    async execute(): Promise<FindAllProductsOutput[]> {
        const products = await this.productRepository.findAll()
        const output: FindAllProductsOutput[] = []
        for (const product of products) {
            output.push({
                id: product.id,
                name: product.name,
                price: product.price
            })
        }
        return output
    }
}

export type FindAllProductsOutput = {
    id: string,
    name: string,
    price: number
}
