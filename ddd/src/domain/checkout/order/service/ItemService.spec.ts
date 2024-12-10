import { randomUUID } from 'crypto'
import { describe, expect, it } from 'vitest'
import { Item } from '../entity/Item'
import { ItemService } from './ItemService'

describe('ItemService test', () => {
    it('Should increase all prices', () => {
        const items = [new Item(randomUUID(), "Item 1", 10), new Item(randomUUID(), "Item 2", 20)]
        ItemService.increaseAllPrices(items, 10)
        expect(items[0].price).toBe(11)
        expect(items[1].price).toBe(22)
    })  
})