import { Order } from '../domain/order.entity'

export interface CheckoutGateway {
    save(order: Order): Promise<void>
    find(orderId: string): Promise<Order>
}
