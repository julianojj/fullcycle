import { UseCase } from '../../../@shared/usecases/use-case.interface'
import { ProductGateway } from '../../gateway/product.gateway'
import { CheckStockOutput } from './check-stock.dto'

export class CheckStockUsecase implements UseCase {
    private _productRepository: ProductGateway

    constructor(
        productRepository: ProductGateway
    ) {
        this._productRepository = productRepository
    }

    async execute(productId: string): Promise<CheckStockOutput> {
        const product = await this._productRepository.find(productId)
        if (!product) throw new Error('Product not found')
        return {
            productId,
            stock: product.stock
        }
    }
}
