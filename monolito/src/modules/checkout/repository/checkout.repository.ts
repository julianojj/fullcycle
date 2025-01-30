import { Id } from '../../@shared/domain/value-object/id.value-object'
import { Order } from '../domain/order.entity'
import { Product } from '../domain/product.entity'
import { CheckoutGateway } from '../gateway/checkout.gateway'
import { OrderItemModel } from './order-item.model'
import { OrderModel } from './order.model'

export class CheckoutRepository implements CheckoutGateway {
    async save(order: Order): Promise<void> {
        await OrderModel.create({
            id: order.id,
            clientId: order.clientId,
            status: order.status,
            total: order.calculateTotal(),
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        })
        for (const item of order.orderItems) {
            await OrderItemModel.create({
                orderId: order.id,
                productId: item.id,
                name: item.name,
                description: item.description,
                price: item.salesPrice,
            })
        }
    }

    async find(orderId: string): Promise<Order> {
        const orderResult = await OrderModel.findOne({
            where: {
                id: orderId
            }
        })
        if (!orderResult) return null
        const order = new Order({
            id: new Id(orderResult.id),
            clientId: orderResult.clientId
        })
        const itemsResult = await OrderItemModel.findAll({
            where: {
                orderId: orderResult.id
            }
        })
        for (const item of itemsResult) {
            order.addProduct(new Product({
                id: new Id(item.productId),
                name: item.name,
                description: item.description,
                salesPrice: item.price,
            }))
        }
        return order
    }
}
