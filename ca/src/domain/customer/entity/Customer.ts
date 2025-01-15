import { ExceptionMessages } from '../../../exception/ValidationException'
import { Entity } from '../../entity/entity'
import { NotificationError } from '../../notification/notification.error'
import { CustomerValidatorFactory } from '../factory/CustomerValidatorFactory'

export class Customer  extends Entity {
    private _name: string
    private _address: Address
    private _rewardPoints: number

    constructor(
        id: string,
        name: string,
        address: Address,
        rewardPoints: number = 0
    ) {
        super(id)
        this._name = name
        this._address = address
        this._rewardPoints = rewardPoints
        this.validate()
        if (this.notification.hasError()) throw new NotificationError(this.notification.errors())
    }

    private validate(): void {
        CustomerValidatorFactory.create().validate(this)
    }

    get name(): string {
        return this._name
    }

    get address(): Address {
        return this._address
    }

    get rewardPoints(): number {
        return this._rewardPoints
    }

    updateName(name: string): void {
        this._name = name
    }

    updateAddress(address: Address): void {
        this._address = address
    }

    addRewardPoints(points: number): void {
        if (points < 0) throw ExceptionMessages.ErrNegativeRewardPoints
        this._rewardPoints += points
    }
}

export class Address {
    constructor(
        readonly street: string,
        readonly city: string,
        readonly state: string,
        readonly zipCode: string
    ) {
        this.validate()
    }

    private validate(): void {
        if (!this.street) throw ExceptionMessages.ErrRequiredStreet
        if (!this.city) throw ExceptionMessages.ErrRequiredCity
        if (!this.state) throw ExceptionMessages.ErrRequiredState
        if (!this.zipCode) throw ExceptionMessages.ErrRequiredZipCode
    }

    toUS(): string {
        return `${this.street}, ${this.city}, ${this.state} ${this.zipCode}`
    }
}
