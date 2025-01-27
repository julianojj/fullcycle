import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import { Id } from '../../@shared/domain/value-object/id.value-object'
import { Address } from '../domain/address'
import { Invoice } from '../domain/invoice'
import InvoiceItemModel from '../repository/invoice-items.model'
import InvoiceModel from '../repository/invoice.model'
import { InvoiceRepository } from '../repository/invoice.repository'
import sequelize from '../repository/sequelize'
import { FindInvoiceUsecase } from '../usecases/find-invoice/find-invoice.usecase'
import { GenerateInvoiceUsecase } from '../usecases/generate-invoice/generate-invoice.usecase'
import { InvoiceFacade } from './invoice.facade'

describe('Invoice facade test', () => {
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
        const invoiceRepository = new InvoiceRepository()
        const generateInvoice = new GenerateInvoiceUsecase(invoiceRepository)
        const findInvoice = new FindInvoiceUsecase(invoiceRepository)
        const invoiceFacade = new InvoiceFacade(generateInvoice, findInvoice)
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
        const savedInvoice = await invoiceRepository.find(output.id)
        expect(savedInvoice.id).toBe(output.id)
        expect(savedInvoice.name).toBe('John Doe')
        expect(savedInvoice.document).toBe('1234567890')
        expect(savedInvoice.address.street).toBe('Street 1')
        expect(savedInvoice.address.number).toBe('123')
        expect(savedInvoice.address.complement).toBe('Apt 1')
        expect(savedInvoice.address.city).toBe('City 1')
        expect(savedInvoice.address.state).toBe('State 1')
        expect(savedInvoice.address.zipCode).toBe('12345-678')
        expect(savedInvoice.items).toHaveLength(2)
        expect(savedInvoice.items[0].id).toBeDefined()
        expect(savedInvoice.items[0].name).toBe('Item 1')
        expect(savedInvoice.items[0].price).toBe(100)
        expect(savedInvoice.items[1].id).toBeDefined()
        expect(savedInvoice.items[1].name).toBe('Item 2')
        expect(savedInvoice.items[1].price).toBe(200)
        expect(savedInvoice.getTotal()).toBe(300)
    })

    it('should find invoice', async () => {
        const invoiceRepository = new InvoiceRepository()
        const generateInvoice = new GenerateInvoiceUsecase(invoiceRepository)
        const findInvoice = new FindInvoiceUsecase(invoiceRepository)
        const invoiceFacade = new InvoiceFacade(generateInvoice, findInvoice)
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
        await invoiceRepository.save(invoice)
        const savedInvoice = await invoiceFacade.findInvoice({
            id: invoice.id,
        })
        expect(savedInvoice.id).toBe(invoice.id)
        expect(savedInvoice.name).toBe('John Doe')
        expect(savedInvoice.document).toBe('1234567890')
        expect(savedInvoice.address.street).toBe('Street 1')
        expect(savedInvoice.address.number).toBe('123')
        expect(savedInvoice.address.complement).toBe('Apt 1')
        expect(savedInvoice.address.city).toBe('City 1')
        expect(savedInvoice.address.state).toBe('State 1')
        expect(savedInvoice.address.zipCode).toBe('12345-678')
        expect(savedInvoice.items).toHaveLength(2)
        expect(savedInvoice.items[0].id).toBeDefined()
        expect(savedInvoice.items[0].name).toBe('Test Item')
        expect(savedInvoice.items[0].price).toBe(100)
        expect(savedInvoice.items[1].id).toBeDefined()
        expect(savedInvoice.items[1].name).toBe('Test Item 2')
        expect(savedInvoice.items[1].price).toBe(200)
        expect(savedInvoice.total).toBe(300)
    })
})
