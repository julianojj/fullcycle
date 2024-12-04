import { randomUUID } from 'crypto'
import { describe, expect, it } from 'vitest'
import { Address, Customer } from './Customer'

describe('Customer test', () => {
    it('Should create a customer', () => {
        const customer = new Customer(randomUUID(), new Address("123 Main St", "Anytown", "CA", "12345"))
        expect(customer.id).toBeDefined()
        expect(customer.address.street).toBe("123 Main St")
        expect(customer.address.city).toBe("Anytown")
        expect(customer.address.state).toBe("CA")
        expect(customer.address.zipCode).toBe("12345")
        expect(customer.rewardPoints).toBe(0)
    })

    it('Should update customer address', () => {
        const customer = new Customer(randomUUID(), new Address("123 Main St", "Anytown", "CA", "12345"))
        customer.updateAddress(new Address("456 Elm St", "New York", "NY", "54321"))
        expect(customer.address.street).toBe("456 Elm St")
        expect(customer.address.city).toBe("New York")
        expect(customer.address.state).toBe("NY")
        expect(customer.address.zipCode).toBe("54321")
        customer.updateAddress(new Address("789 Oak St", "Los Angeles", "CA", "98765"))
        expect(customer.address.street).toBe("789 Oak St")
        expect(customer.address.city).toBe("Los Angeles")
        expect(customer.address.state).toBe("CA")
        expect(customer.address.zipCode).toBe("98765")
    })

    it('Should add and subtract reward points', () => {
        const customer = new Customer(randomUUID(), new Address("123 Main St", "Anytown", "CA", "12345"))
        customer.addRewardPoints(100)
        expect(customer.rewardPoints).toBe(100)
    })

    it('Should throw exception when reward points are negative', () => {
        const customer = new Customer(randomUUID(), new Address("123 Main St", "Anytown", "CA", "12345"))
        expect(() => customer.addRewardPoints(-100)).toThrowError('reward points cannot be negative')
    })

    it('Should throw exception when id is empty', () => {
        expect(() => new Customer("", new Address("123 Main St", "Anytown", "CA", "12345"))).toThrowError('customer id is required')
    })

    it('Should throw exception when address is empty', () => {
        expect(() => new Customer(randomUUID(), null)).toThrowError('address is required')
    })

    it('Should throw exception when street is empty', () => {
        expect(() => new Address("", "Anytown", "CA", "12345")).toThrowError('street is required')
    })

    it('Should throw exception when city is empty', () => {
        expect(() => new Address("123 Main St", "", "CA", "12345")).toThrowError('city is required')
    })

    it('Should throw exception when state is empty', () => {
        expect(() => new Address("123 Main St", "Anytown", "", "12345")).toThrowError('state is required')
    })

    it('Should throw exception when zipCode is empty', () => {
        expect(() => new Address("123 Main St", "Anytown", "CA", "")).toThrowError('zip code is required')
    })
})
