import { describe, expect, it, vitest } from 'vitest'
import { FindInvoiceUsecase } from './find-invoice.usecase'
import { Invoice } from '../../domain/invoice'
import { Id } from '../../../@shared/domain/value-object/id.value-object'
import { Address } from '../../domain/address'

describe('Find invoice test', () => {
    it('should find invoice', async () => {
        const invoiceRepository = {
            save: vitest.fn(),
            find: vitest.fn()
        }
        const findInvoice = new FindInvoiceUsecase(invoiceRepository)
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
            ),
        })
        invoice.addItem('1', 'Test Item', 100)
        invoice.addItem('2', 'Test Item 2', 200)        
        invoiceRepository.find.mockResolvedValue(invoice)
        const output = await findInvoice.execute({
            id: '1',
        })
        const savedInvoice = await invoiceRepository.find(output.id)
        expect(savedInvoice.id).toBe(output.id)
        expect(savedInvoice.name).toBe(invoice.name)
        expect(savedInvoice.document).toBe(invoice.document)
        expect(savedInvoice.address).toBe(invoice.address)
        expect(savedInvoice.items).toEqual(invoice.items)
        expect(savedInvoice.getTotal()).toBe(300)
    })

    it('should throw error when invoice not found', async () => {
        const invoiceRepository = {
            save: vitest.fn(),
            find: vitest.fn()
        }
        invoiceRepository.find.mockResolvedValue(null)
        const findInvoice = new FindInvoiceUsecase(invoiceRepository)
        await expect(findInvoice.execute({
            id: '1',
        })).rejects.toThrow('invoice not found')
    })
})
