import { Item } from './Item'
import { OrderItem } from './OrderItem'

export class Order {
    private readonly _orderItems: OrderItem[]

    constructor(
        readonly id: string,
        readonly customerId: string,
        readonly total: number = 0
    ) {
        this._orderItems = []
        this.validate()
    }

    validate(): void {
        if (!this.id) throw new Error('id is required')
        if (!this.customerId) throw new Error('customerId is required') 
    }

    get orderItems(): OrderItem[] {
        return this._orderItems
    }

    addItem(item: Item, quantity: number): void {
        const orderItem = new OrderItem(this.id, quantity, item)
        this.orderItems.push(orderItem)
    }

    getTotalPrice(): number {
        let total = 0
        for (const orderItem of this.orderItems) {
            total += orderItem.getTotalPrice()
        }
        return total
    }
}
