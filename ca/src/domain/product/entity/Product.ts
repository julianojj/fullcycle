import { ExceptionMessages } from '../../../exception/ValidationException'
import { Entity } from '../../entity/entity'
import { NotificationError } from '../../notification/notification.error'

const context = 'product'

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
        if (!this._id) {
            this.notification.addError({
                message: ExceptionMessages.ErrRequiredProductId.message,
                context,
            })
        }
        if (!this._name) {
            this.notification.addError({
                message: ExceptionMessages.ErrRequiredProductName.message,
                context,
            })
        }
        if (this._price <= 0) {
            this.notification.addError({
                message: ExceptionMessages.ErrInvalidPrice.message,
                context,
            })
        }
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
