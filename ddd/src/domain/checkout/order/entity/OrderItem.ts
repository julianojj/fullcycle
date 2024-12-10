import { Item } from './Item'

export class OrderItem {
    private _orderId: string
    private _quantity: number
    private _item: Item

    constructor(
        orderId: string,
        quantity: number,
        item: Item
    ) {
        this._orderId = orderId
        this._quantity = quantity
        this._item = item
    }

    get quantity(): number {
        return this._quantity
    }

    get item(): Item {
        return this._item
    }

    getTotalPrice(): number {
        return this._quantity * this._item.price
    }
}
