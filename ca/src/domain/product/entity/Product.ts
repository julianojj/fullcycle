import { Entity } from '../../entity/entity'
import { NotificationError } from '../../notification/notification.error'
import { ProductValidatorFactory } from '../factory/ProductValidatorFactory'


export class Product extends Entity {
    private _name: string
    private _price: number

    constructor(
        id: string,
        name: string,
        price: number
    ) {
        super(id)
        this._name = name
        this._price = price
        this.validate()
        if (this.notification.hasError()) throw new NotificationError(this.notification.errors())
    }

    get name(): string {
        return this._name
    }

    get price(): number {
        return this._price
    }

    private validate(): void {
        ProductValidatorFactory.create().validate(this)
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
