import { randomUUID } from 'crypto'
import { describe, expect, it } from 'vitest'
import { Product } from './Product'

describe('Product test', () => {
    it('Should create a new product', () => {
        const product = new Product(randomUUID(), 'Product 1', 10)
        expect(product.id).toBeDefined()
        expect(product.name).toBe('Product 1')
        expect(product.price).toBe(10)
    })

    it('Should update name', () => {
        const product = new Product(randomUUID(), 'Product 1', 10)
        expect(product.name).toBe('Product 1')
        product.updateName('Updated Product')
        expect(product.name).toBe('Updated Product')
    })

    it('Should update price', () => {
        const product = new Product(randomUUID(), 'Product 1', 10)
        product.updatePrice(20)
        expect(product.price).toBe(20)
    })

    it('Should throw exception when id is empty', () => {
        expect(() => new Product('', 'Product 1', 10)).toThrowError('Product id is required')
    })

    it('Should throw exception when name is empty', () => {
        expect(() => new Product(randomUUID(), '', 10)).toThrowError('Product name is required')
    })

    it('Should throw exception when invalid price', () => {
        expect(() => new Product(randomUUID(), 'Product 1', -10)).toThrowError('Invalid price')
    })
})
