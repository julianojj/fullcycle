import { describe, expect, it } from 'vitest'
import { Id } from '../../@shared/domain/value-object/id.value-object'
import { Order } from './order.entity'
import { Product } from './product.entity'

describe('Order test', () => {
    it('should create a new order', () => {
        const order = new Order({
            clientId: '1'
        })
        order.addProduct(new Product({
            id: new Id('1'),
            name: 'Test Product',
            description: 'Test Product Description',
            salesPrice: 10.99
        }))
        order.addProduct(new Product({
            id: new Id('2'),
            name: 'Test Product 2',
            description: 'Test Product 2 Description',
            salesPrice: 15.99
        }))
        expect(order.id).toBeDefined()
        expect(order.orderItems.length).toBe(2)
        expect(order.orderItems[0].name).toBe('Test Product')
        expect(order.orderItems[0].description).toBe('Test Product Description')
        expect(order.orderItems[0].salesPrice).toBe(10.99)
        expect(order.orderItems[1].name).toBe('Test Product 2')
        expect(order.orderItems[1].description).toBe('Test Product 2 Description')
        expect(order.orderItems[1].salesPrice).toBe(15.99)
        expect(order.calculateTotal()).toBe(26.98)
    })
})
