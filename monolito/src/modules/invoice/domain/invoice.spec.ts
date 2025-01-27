import { describe, expect, it } from 'vitest'
import { Address } from './address'
import { Invoice } from './invoice'

describe('Invoice test', () => {
    it('should create invoice', () => {
        const invoice = new Invoice({
            name: 'Invoice test',
            document: 'Document test',
            address: new Address(
                'Street test',
                'Number test',
                'Complement test',
                'City test',
                'State test',
                '12345-678'
            ),
        })
        invoice.addItem('1', 'Item 1', 100)
        invoice.addItem('2', 'Item 2', 200)
        expect(invoice.id).toBeDefined()
        expect(invoice.name).toBe('Invoice test')
        expect(invoice.document).toBe('Document test')
        expect(invoice.address.street).toBe('Street test')
        expect(invoice.address.number).toBe('Number test')
        expect(invoice.address.complement).toBe('Complement test')  
        expect(invoice.address.city).toBe('City test')
        expect(invoice.address.state).toBe('State test')
        expect(invoice.getTotal()).toBe(300)
        expect(invoice.items).toHaveLength(2)
        expect(invoice.items[0].id).toBeDefined()
        expect(invoice.items[0].name).toBe('Item 1')
        expect(invoice.items[0].price).toBe(100)
        expect(invoice.items[1].id).toBeDefined()
        expect(invoice.items[1].name).toBe('Item 2')
        expect(invoice.items[1].price).toBe(200)
    })
})
