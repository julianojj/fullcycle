import { Product } from '../../../../domain/product/entity/Product'
import { ProductRepositoryInterface } from '../../../../domain/product/repository/ProductRepositoryInterface'
import ProductModel from '../../../database/sequelize/model/ProductModel'

export class ProductRepositoryDatabase implements ProductRepositoryInterface {
    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price
        })
    }

    async findById(id: string): Promise<Product> {
        const productResult = await ProductModel.findOne({
            where: {
                id
            }
        })
        if (!productResult) return
        return new Product(productResult.id, productResult.name, productResult.price)
    }

    async findAll(): Promise<Product[]> {
        const productsResult = await ProductModel.findAll()
        const products: Product[] = []
        for (const productResult of productsResult) {
            products.push(new Product(productResult.id, productResult.name, productResult.price))
        }
        return products
    }

    async update(entity: Product): Promise<void> {
        await ProductModel.update({
            name: entity.name,
            price: entity.price
            }, {
            where: {
                id: entity.id
            }
        })
    }
}
