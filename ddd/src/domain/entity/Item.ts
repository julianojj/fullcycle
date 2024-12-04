export class Item {
    private _price: number

    constructor(
        readonly id: string,
        readonly name: string,
        price: number
    ) {
        this._price = price
        this.validate()
    }

    get price(): number {
        return this._price
    }

    private validate(): void {
        if (!this.id) throw new Error('item id is required')
        if (this._price <= 0) throw new Error('invalid price')
        if (!this.name) throw new Error('item name is required')
    }

    updatePrice(price: number) {
        this._price = price
        this.validate()
    }
}
