import { Id } from '../../@shared/domain/value-object/id.value-object'
import { Product } from '../domain/product.entity'
import { ProductGateway } from '../gateway/product.gateway'
import ProductModel from './product.model'

export class ProductRepository implements ProductGateway {
    async find(id: string): Promise<Product> {
        const productResult = await ProductModel.findOne({
            where: {
                id
            }
        })
        if (!productResult) return null
        return new Product({
            id: new Id(productResult.id),
            name: productResult.name,
            description: productResult.description,
            salesPrice: productResult.salesPrice
        })
    }

    async findAll(): Promise<Product[]> {
        const productsResult = await ProductModel.findAll()
        const products = []
        for (const productResult of productsResult) {
            products.push(new Product({
                id: new Id(productResult.id),
                name: productResult.name,
                description: productResult.description,
                salesPrice: productResult.salesPrice
            }))
        }
        return products
    }
}
