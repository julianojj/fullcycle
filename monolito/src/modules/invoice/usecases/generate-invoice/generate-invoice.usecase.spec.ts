import { describe, expect, it, vitest } from 'vitest'
import { GenerateInvoiceUsecase } from './generate-invoice.usecase'

describe('Generate invoice test', () => {
    it('should generate invoice', async () => {
        const invoiceRepository = {
            save: vitest.fn(),
            find: vitest.fn()
        }
        const generateInvoice = new GenerateInvoiceUsecase(invoiceRepository)
        const output = await generateInvoice.execute({
            name: 'John Doe',
            document: '1234567890',
            street: 'Street 1',
            number: '123',
            complement: 'Apt 1',
            city: 'City 1',
            state: 'State 1',
            zipCode: '12345-678',
            items: [
                { id: '1', name: 'Item 1', price: 100 },
                { id: '2', name: 'Item 2', price: 200 }
            ]
        })
        invoiceRepository.find.mockResolvedValue({
            id: output.id,
            name: 'John Doe',
            document: '1234567890',
            street: 'Street 1',
            number: '123',
            complement: 'Apt 1',
            city: 'City 1',
            state: 'State 1',
            zipCode: '12345-678',
            items: [
                { id: '1', name: 'Item 1', price: 100 },
                { id: '2', name: 'Item 2', price: 200 }
            ],
            total: 300
        })
        const savedInvoice = await invoiceRepository.find(output.id)
        expect(savedInvoice.id).toBe(output.id)
        expect(savedInvoice.name).toBe('John Doe')
        expect(savedInvoice.document).toBe('1234567890')
        expect(savedInvoice.street).toBe('Street 1')
        expect(savedInvoice.number).toBe('123')
        expect(savedInvoice.complement).toBe('Apt 1')
        expect(savedInvoice.city).toBe('City 1')
        expect(savedInvoice.state).toBe('State 1')
        expect(savedInvoice.zipCode).toBe('12345-678')
        expect(savedInvoice.items).toEqual(output.items)
        expect(savedInvoice.total).toBe(300)
    })
})
