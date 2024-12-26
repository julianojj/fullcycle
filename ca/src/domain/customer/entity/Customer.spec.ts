import { randomUUID } from 'crypto'
import { describe, expect, it } from 'vitest'
import { ExceptionMessages } from '../../../exception/ValidationException'
import { Address, Customer } from './Customer'

describe('Customer test', () => {
    it('Should create a customer', () => {
        const customer = new Customer(randomUUID(), 'John Doe', new Address('123 Main St', 'Anytown', 'CA', '12345'))
        expect(customer.id).toBeDefined()
        expect(customer.address.street).toBe('123 Main St')
        expect(customer.address.city).toBe('Anytown')
        expect(customer.address.state).toBe('CA')
        expect(customer.address.zipCode).toBe('12345')
        expect(customer.rewardPoints).toBe(0)
    })

    it ('Should update customer name', () => {
        const customer = new Customer(randomUUID(), 'John Doe', new Address('123 Main St', 'Anytown', 'CA', '12345'))
        expect(customer.name).toBe('John Doe')
        customer.updateName('Jhon')
        expect(customer.name).toBe('Jhon')
    })

    it('Should update customer address', () => {
        const customer = new Customer(randomUUID(), 'John Doe', new Address('123 Main St', 'Anytown', 'CA', '12345'))
        customer.updateAddress(new Address('456 Elm St', 'New York', 'NY', '54321'))
        expect(customer.address.street).toBe('456 Elm St')
        expect(customer.address.city).toBe('New York')
        expect(customer.address.state).toBe('NY')
        expect(customer.address.zipCode).toBe('54321')
        customer.updateAddress(new Address('789 Oak St', 'Los Angeles', 'CA', '98765'))
        expect(customer.address.street).toBe('789 Oak St')
        expect(customer.address.city).toBe('Los Angeles')
        expect(customer.address.state).toBe('CA')
        expect(customer.address.zipCode).toBe('98765')
    })

    it('Should add reward points', () => {
        const customer = new Customer(randomUUID(), 'John Doe', new Address('123 Main St', 'Anytown', 'CA', '12345'))
        customer.addRewardPoints(100)
        expect(customer.rewardPoints).toBe(100)
    })

    it('Should get address with us formatted', () => {
        const customer = new Customer(randomUUID(), 'John Doe', new Address('123 Main St', 'Anytown', 'CA', '12345'))
        expect(customer.address.toUS()).toBe('123 Main St, Anytown, CA 12345')
    })

    it('Should throw exception when reward points are negative', () => {
        const customer = new Customer(randomUUID(), 'John Doe', new Address('123 Main St', 'Anytown', 'CA', '12345'))
        expect(() => customer.addRewardPoints(-100)).toThrowError(ExceptionMessages.ErrNegativeRewardPoints)
    })

    it('Should throw exception when id is empty', () => {
        expect(() => new Customer('', 'Jhon Doe', new Address('123 Main St', 'Anytown', 'CA', '12345'))).toThrowError(ExceptionMessages.ErrRequiredCustomerId)
    })

    it('Should throw exception when name is empty', () => {
        expect(() => new Customer(randomUUID(), '', new Address('123 Main St', 'Anytown', 'CA', '12345'))).toThrowError(ExceptionMessages.ErrRequiredCustomerName)
    })

    it('Should throw exception when address is empty', () => {
        expect(() => new Customer(randomUUID(), 'John Doe', null)).toThrowError(ExceptionMessages.ErrRequiredAddress)
    })

    it('Should throw exception when street is empty', () => {
        expect(() => new Address('', 'Anytown', 'CA', '12345')).toThrowError(ExceptionMessages.ErrRequiredStreet)
    })

    it('Should throw exception when city is empty', () => {
        expect(() => new Address('123 Main St', '', 'CA', '12345')).toThrowError(ExceptionMessages.ErrRequiredCity)
    })

    it('Should throw exception when state is empty', () => {
        expect(() => new Address('123 Main St', 'Anytown', '', '12345')).toThrowError(ExceptionMessages.ErrRequiredState)
    })

    it('Should throw exception when zipCode is empty', () => {
        expect(() => new Address('123 Main St', 'Anytown', 'CA', '')).toThrowError(ExceptionMessages.ErrRequiredZipCode)
    })
})
