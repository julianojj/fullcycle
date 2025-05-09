import { ValueObject } from '../../@shared/domain/value-object/value-object.interface'

export class Address implements ValueObject {
    private _street: string
    private _complement: string
    private _city: string
    private _state: string
    private _zipCode: string

    constructor(street: string, complement: string, city: string, state: string, zipCode: string) {
        this._street = street
        this._complement = complement
        this._city = city
        this._state = state
        this._zipCode = zipCode
    }

    get street(): string {
        return this._street
    }

    get complement(): string {
        return this._complement
    }

    get city(): string {
        return this._city
    }

    get state(): string {
        return this._state
    }

    get zipCode(): string {
        return this._zipCode
    }
}
