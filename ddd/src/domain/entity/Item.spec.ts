import { randomUUID } from 'crypto'
import { describe, expect, it } from 'vitest'
import { Item } from './Item'

describe('Item test', () => {
    it('Should create a new item', () => {
        const item = new Item(randomUUID(), "Item 1", 10)
        expect(item.id).toBeDefined()
        expect(item.name).toBe("Item 1")
        expect(item.price).toBe(10)
    })

    it('Should update price', () => {
        const item = new Item(randomUUID(), "Item 1", 10)
        item.updatePrice(20)
        expect(item.price).toBe(20)
    })

    it('Should throw exception when id is empty', () => {
        expect(() => new Item("", "Item 1", 10)).toThrowError('id is required')
    })

    it('Should throw exception when name is empty', () => {
        expect(() => new Item(randomUUID(), "", 10)).toThrowError('name is required')
    })

    it('Should throw exception when invalid price', () => {
        expect(() => new Item(randomUUID(), "Item 1", -10)).toThrowError('invalid price')
    })
})
