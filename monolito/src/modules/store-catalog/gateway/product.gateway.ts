import { Product } from '../domain/product.entity'

export interface ProductGateway {
    find(id: string): Promise<Product>
    findAll(): Promise<Product[]>
}
