export class Product {
    private _name: string
    private _price: number

    constructor(
        readonly id: string,
        name: string,
        price: number
    ) {
        this._name = name
        this._price = price
        this.validate()
    }

    get name(): string {
        return this._name
    }

    get price(): number {
        return this._price
    }

    private validate(): void {
        if (!this.id) throw new Error('product id is required')
        if (this._price <= 0) throw new Error('invalid price')
        if (!this._name) throw new Error('product name is required')
    }

    updateName(name: string) {
        this._name = name
        this.validate()
    }

    updatePrice(price: number) {
        this._price = price
        this.validate()
    }
}
