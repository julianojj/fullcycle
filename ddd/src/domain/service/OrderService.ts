import { Customer } from '../entity/Customer'
import { Order } from '../entity/Order'

export class OrderService {
    static placeOrder(order: Order, customer: Customer): void {
        customer.addRewardPoints(order.getTotalPrice() / 2)
    }
}
