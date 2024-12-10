import { Item } from '../../../../domain/checkout/order/entity/Item'
import { Order } from '../../../../domain/checkout/order/entity/Order'
import { OrderRepositoryInterface } from '../../../../domain/checkout/order/repository/OrderRepositoryInterface'
import OrderItemModel from '../../../database/sequelize/model/OrderItemModel'
import OrderModel from '../../../database/sequelize/model/OrderModel'

export class OrderRepositoryDatabase implements OrderRepositoryInterface {

    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customerId: entity.customerId,
            total: entity.getTotalPrice()
        })
        for (const orderItem of entity.orderItems) {
            await OrderItemModel.create({
                orderId: entity.id,
                itemId: orderItem.item.id,
                name: orderItem.item.name,
                price: orderItem.item.price,
                quantity: orderItem.quantity
            })
        }
    }

    async findById(id: string): Promise<Order> {
        const orderResult = await OrderModel.findOne({
            where: {
                id
            }
        })
        if (!orderResult) return undefined
        const order = new Order(orderResult.id, orderResult.customerId, orderResult.total)
        const orderItemsResult = await OrderItemModel.findAll({
            where: {
                orderId: orderResult.id
            }
        })
        for (const orderItemResult of orderItemsResult) {
            order.addItem(new Item(orderItemResult.itemId, orderItemResult.name, orderItemResult.price), orderItemResult.quantity)
        }
        return order
    }

    async findAll(): Promise<Order[]> {
        const results = await OrderModel.findAll()
        const orders: Order[] = []
        for (const result of results) {
            const order = new Order(result.id, result.customerId)
            const orderItemsResult = await OrderItemModel.findAll({
                where: {
                    orderId: order.id,
                }
            })
            for (const orderItemResult of orderItemsResult) {
                order.addItem(new Item(orderItemResult.itemId, orderItemResult.name, orderItemResult.price), orderItemResult.quantity)
            }
            orders.push(order)
        }
        return orders
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update({
            total: entity.getTotalPrice()
            }, {
            where: {
                id: entity.id
    
            }
        })
        for (const orderItem of entity.orderItems) {
            const existingOrderItemResult = await OrderItemModel.findOne({
                where: {
                    orderId: entity.id,
                    itemId: orderItem.item.id
                }
            })
            if (!existingOrderItemResult) {
                await OrderItemModel.create({
                    orderId: entity.id,
                    itemId: orderItem.item.id,
                    name: orderItem.item.name,
                    price: orderItem.item.price,
                    quantity: orderItem.quantity
                })
            }
        }
    }
}
