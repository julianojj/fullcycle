import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import { Id } from '../../@shared/domain/value-object/id.value-object'
import { Address } from '../domain/address'
import { Invoice } from '../domain/invoice'
import InvoiceItemModel from './invoice-items.model'
import InvoiceModel from './invoice.model'
import { InvoiceRepository } from './invoice.repository'
import sequelize from './sequelize'

describe('Invoice repository test', () => {
    beforeEach(async () => {
        await sequelize.sync()
    })

    afterEach(async () => {
        await InvoiceItemModel.destroy({ where: {} })
        await InvoiceModel.destroy({ where: {}})
    })

    afterAll(async () => {
        await sequelize.close() 
    })

    it('should save invoice', async () => {
        const invoiceRepository = new InvoiceRepository()
        const invoice = new Invoice({
            id: new Id('1'),
            name: 'Test Invoice',
            document: '1234567890',
            address: new Address(
                'Rua Teste',
                '123',
                'A',
                'Test City',
                'Test State',
                '12345-678'
            )
        })
        invoice.addItem('1', 'Test Item', 100)
        invoice.addItem('2', 'Test Item 2', 200)
        await invoiceRepository.save(invoice)
        const savedInvoice = await InvoiceModel.findOne({
            where: { id: invoice.id }
        })
        expect(savedInvoice.id).toBe('1')
        expect(savedInvoice.name).toBe('Test Invoice')
        expect(savedInvoice.document).toBe('1234567890')
        const savedInvoiceItems = await InvoiceItemModel.findAll({
            where: { invoiceId: invoice.id }
        })
        expect(savedInvoiceItems.length).toBe(2)
        expect(savedInvoiceItems[0].id).toBeDefined()
        expect(savedInvoiceItems[0].invoiceId).toBe(invoice.id)
        expect(savedInvoiceItems[0].name).toBe('Test Item')
        expect(savedInvoiceItems[0].price).toBe(100)
        expect(savedInvoiceItems[1].id).toBeDefined()
        expect(savedInvoiceItems[1].invoiceId).toBe(invoice.id)
        expect(savedInvoiceItems[1].name).toBe('Test Item 2')   
        expect(savedInvoiceItems[1].price).toBe(200)    
        expect(invoice.getTotal()).toBe(300)
    })

    it('should find invoice', async () => {
        const invoiceRepository = new InvoiceRepository()
        const invoice = new Invoice({
            id: new Id('1'),
            name: 'Test Invoice',
            document: '1234567890',
            address: new Address(
                'Rua Teste',
                '123',
                'A',
                'Test City',
                'Test State',
                '12345-678'
            )
        })
        invoice.addItem('1', 'Test Item', 100)
        invoice.addItem('2', 'Test Item 2', 200)
        await invoiceRepository.save(invoice)
        const savedInvoice = await invoiceRepository.find(invoice.id)
        expect(savedInvoice.id).toBe('1')
        expect(savedInvoice.name).toBe('Test Invoice')
        expect(savedInvoice.document).toBe('1234567890')
        expect(savedInvoice.address).toStrictEqual(invoice.address)
        expect(invoice.items[0].id).toBe(invoice.items[0].id)
        expect(invoice.items[0].name).toBe(invoice.items[0].name)
        expect(invoice.items[0].price).toBe(invoice.items[0].price)
        expect(invoice.items[1].id).toBe(invoice.items[1].id)
        expect(invoice.items[1].name).toBe(invoice.items[1].name)
        expect(invoice.items[1].price).toBe(invoice.items[1].price)
        expect(invoice.getTotal()).toBe(300)
    })
})
