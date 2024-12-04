export class Customer {
    private _address: Address
    private _rewardPoints: number

    constructor(
        readonly id: string,
        address: Address,

    ) {
        this._address = address
        this._rewardPoints = 0
        this.validate()
    }

    private validate(): void {
        if (!this.id) throw new Error('customer id is required')
        if (!this._address) throw new Error('address is required')
    }

    get address(): Address {
        return this._address
    }

    get rewardPoints(): number {
        return this._rewardPoints
    }

    updateAddress(address: Address): void {
        this._address = address
    }

    addRewardPoints(points: number): void {
        if (points < 0) throw new Error('reward points cannot be negative')
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
        if (!this.street) throw new Error('street is required')
        if (!this.city) throw new Error('city is required')
        if (!this.state) throw new Error('state is required')
        if (!this.zipCode) throw new Error('zip code is required')
    }
}
