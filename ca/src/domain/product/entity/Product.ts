import { ExceptionMessages } from '../../../exception/ValidationException'

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
        if (!this.id) throw ExceptionMessages.ErrRequiredProductId
        if (!this._name) throw ExceptionMessages.ErrRequiredProductName
        if (this._price <= 0) throw ExceptionMessages.ErrInvalidPrice
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
