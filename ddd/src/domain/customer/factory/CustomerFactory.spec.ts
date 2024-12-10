import { describe, expect, it } from 'vitest'
import CustomerFactory from './CustomerFactory'

describe('CustomerFactory test', () => {
    it('Should create a new customer', () => {
        const product = CustomerFactory.create('John Doe', 'Street', 'City', 'State', 'ZipCode')
        expect(product.id).toBeDefined()
        expect(product.name).toBe('John Doe')
        expect(product.address.street).toBe('Street')
        expect(product.address.city).toBe('City')
        expect(product.address.state).toBe('State')
        expect(product.address.zipCode).toBe('ZipCode')
    })
})
