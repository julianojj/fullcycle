import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import { Id } from '../../@shared/domain/value-object/id.value-object'
import { Address } from '../domain/address'
import { Invoice } from '../domain/invoice'
import InvoiceItemModel from '../repository/invoice-items.model'
import InvoiceModel from '../repository/invoice.model'
import sequelize from '../repository/sequelize'
import { InvoiceFacadeFactory } from './invoice.factory'

describe('Invoice factory test', () => {
    beforeEach(async () => {
        await sequelize.sync()
    })

    afterEach(async () => {
        await InvoiceModel.destroy({ where: {} })
        await InvoiceItemModel.destroy({ where: {} })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should generate invoice', async () => {
        const invoiceFacade = InvoiceFacadeFactory.create()
        const output = await invoiceFacade.generateInvoice({
            name: 'John Doe',
            document: '1234567890',
            street: 'Street 1',
            number: '123',
            complement: 'Apt 1',
            city: 'City 1',
            state: 'State 1',
            zipCode: '12345-678',
            items: [
                {
                    id: '1',
                    name: 'Item 1',
                    price: 100,
                },
                {
                    id: '2',
                    name: 'Item 2',
                    price: 200,
                },
            ],
        })
        const savedInvoice = await InvoiceModel.findOne({ where: { id: output.id } })
        expect(savedInvoice.id).toBe(output.id)
        expect(savedInvoice.name).toBe('John Doe')
        expect(savedInvoice.document).toBe('1234567890')
        expect(savedInvoice.street).toBe('Street 1')
        expect(savedInvoice.number).toBe('123')
        expect(savedInvoice.complement).toBe('Apt 1')
        expect(savedInvoice.city).toBe('City 1')
        expect(savedInvoice.state).toBe('State 1')
        expect(savedInvoice.zipCode).toBe('12345-678')
        const savedInvoiceItems = await InvoiceItemModel.findAll({ where: { invoiceId: output.id } })
        expect(savedInvoiceItems.length).toBe(2)
        expect(savedInvoiceItems[0].id).toBeDefined()
        expect(savedInvoiceItems[0].invoiceId).toBe(output.id)
        expect(savedInvoiceItems[0].name).toBe('Item 1')    
        expect(savedInvoiceItems[0].price).toBe(100)
        expect(savedInvoiceItems[1].id).toBeDefined()
        expect(savedInvoiceItems[1].invoiceId).toBe(output.id)
        expect(savedInvoiceItems[1].name).toBe('Item 2')
        expect(savedInvoiceItems[1].price).toBe(200)
        expect(savedInvoice.total).toBe(300)
    })

    it('should find invoice', async () => {
        const invoice = new Invoice({
            id: new Id('1'),
            name: 'John Doe',
            document: '1234567890',
            address: new Address(
                'Street 1',
                '123',
                'Apt 1',
                'City 1',
                'State 1',
                '12345-678'
            )
        })
        invoice.addItem('1', 'Test Item', 100)
        invoice.addItem('2', 'Test Item 2', 200)
        await InvoiceModel.create({
            id: invoice.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,   
        })
        for (const item of invoice.items) {
            await InvoiceItemModel.create({
                id: item.id,
                invoiceId: invoice.id,
                name: item.name,
                price: item.price,
            })
        }
        const invoiceFacade = InvoiceFacadeFactory.create()
        const output = await invoiceFacade.findInvoice({
            id: invoice.id
        })
        expect(output.id).toBe(invoice.id)
        expect(output.id).toBe(output.id)
        expect(output.name).toBe('John Doe')
        expect(output.document).toBe('1234567890')
        expect(output.address.street).toBe('Street 1')
        expect(output.address.number).toBe('123')
        expect(output.address.complement).toBe('Apt 1')
        expect(output.address.city).toBe('City 1')
        expect(output.address.state).toBe('State 1')
        expect(output.address.zipCode).toBe('12345-678')
        expect(output.items.length).toBe(2)
        expect(output.items[0].id).toBeDefined()
        expect(output.items[0].name).toBe('Test Item')
        expect(output.items[0].price).toBe(100)
        expect(output.items[1].id).toBeDefined()
        expect(output.items[1].name).toBe('Test Item 2')
        expect(output.items[1].price).toBe(200)
        expect(output.total).toBe(300)
    })
})
