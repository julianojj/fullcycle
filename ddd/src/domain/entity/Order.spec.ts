import { randomUUID } from 'crypto'
import { describe, expect, it } from 'vitest'
import { Item } from './Item'
import { Order } from './Order'

describe('Order test', () => {
    it('Should create a new order', () => {
        const order = new Order(randomUUID(), "1",)
        expect(order.id).toBeDefined()
        expect(order.customerId).toBe("1")
        expect(order.total).toBe(0)
    })

    it('Should canculate total order', () => {
        const order = new Order(randomUUID(), "1",)
        order.addItem(new Item("1", "Item 1", 10), 2)
        order.addItem(new Item("2", "Item 2", 20), 1)
        expect(order.getTotalPrice()).toBe(40)
    })

    it('Should return exception when id is empty', () => {
        expect(() =>new Order("", "1",)).toThrowError('id is required')
    })

    it('Should return exception when customerId is empty', () => {
        expect(() => new Order("1", "",)).toThrowError('customerId is required')
    })
})
