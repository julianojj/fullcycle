import { Id } from '../../@shared/domain/value-object/id.value-object'
import { Product } from '../domain/product.entity'
import { ProductGateway } from '../gateway/product.gateway'
import ProductModel from './product.model'

export class ProductRepository implements ProductGateway {
    async add(product: Product): Promise<void> {
        await ProductModel.create({
            id: product.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        })
    }

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
            purchasePrice: productResult.purchasePrice,
            stock: productResult.stock,
            createdAt: productResult.createdAt,
            updatedAt: productResult.updatedAt
        })
    }   
}
