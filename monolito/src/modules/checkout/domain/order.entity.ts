import { AggregateRoot } from '../../@shared/domain/entity/aggregate-root.interface'
import { BaseEntity } from '../../@shared/domain/entity/base.entity'
import { Id } from '../../@shared/domain/value-object/id.value-object'
import { Product } from './product.entity'

export type OrderProps = {
    id?: Id
    clientId: string
}

export class Order extends BaseEntity implements AggregateRoot {
    private _client: string
    private _orderItems: Product[]
    private _status: string
    private _invoiceId: string

    constructor(props: OrderProps) {
        super(
            props.id,
            new Date(),
            new Date()
        )
        this._client = props.clientId
        this._orderItems = []
        this._status = 'pending_payment'
    }

    addProduct(product: Product): void {
        this._orderItems.push(product)
    }

    calculateTotal(): number {
        let total = 0
        for (const orderItem of this.orderItems) {
            total += orderItem.salesPrice
        }
        return total
    }

    approve(): void {
        this._status = 'approved_payment'
    }

    decline(): void {
        this._status = 'declined_payment'
    }

    get status(): string {
        return this._status
    }

    get clientId(): string {
        return this._client
    }

    get orderItems(): Product[] {
        return this._orderItems
    }

    get invoiceId(): string {
        return this._invoiceId
    }

    set invoiceId(invoiceId: string) {
        this._invoiceId = invoiceId
    }
}
