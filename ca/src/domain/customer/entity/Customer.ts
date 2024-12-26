import { ExceptionMessages } from '../../../exception/ValidationException'

export class Customer {
    private _name: string
    private _address: Address
    private _rewardPoints: number

    constructor(
        readonly id: string,
        name: string,
        address: Address,
        rewardPoints: number = 0
    ) {
        this._name = name
        this._address = address
        this._rewardPoints = rewardPoints
        this.validate()
    }

    private validate(): void {
        if (!this.id) throw ExceptionMessages.ErrRequiredCustomerId
        if (!this.name) throw ExceptionMessages.ErrRequiredCustomerName
        if (!this._address) throw ExceptionMessages.ErrRequiredAddress
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
