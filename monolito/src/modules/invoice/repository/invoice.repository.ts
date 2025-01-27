import { Id } from '../../@shared/domain/value-object/id.value-object'
import { Address } from '../domain/address'
import { Invoice } from '../domain/invoice'
import { InvoiceGateway } from '../gateway/invoice-gateway'
import InvoiceItemModel from './invoice-items.model'
import InvoiceModel from './invoice.model'

export class InvoiceRepository implements InvoiceGateway {
    async save(invoice: Invoice): Promise<void> {
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
            total: invoice.getTotal(),
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt 
        })
        for (const item of invoice.items) {
            await InvoiceItemModel.create({
                id: item.id,
                invoiceId: invoice.id,
                name: item.name,
                price: item.price
            })
        }
    }

    async find(id: string): Promise<Invoice> {
        const invoiceResult = await InvoiceModel.findOne({
            where: {
                id
            }
        })
        if (!invoiceResult) return null
        const itemsResult = await InvoiceItemModel.findAll({
            where: {
                invoiceId: invoiceResult.id
            }
        })
        const invoice = new Invoice({
            id: new Id(invoiceResult.id),
            name: invoiceResult.name,
            document: invoiceResult.document,
            address: new Address(
                invoiceResult.street,
                invoiceResult.number,
                invoiceResult.complement,
                invoiceResult.city,
                invoiceResult.state,
                invoiceResult.zipCode,
            ),
            createdAt: invoiceResult.createdAt,
            updatedAt: invoiceResult.updatedAt
        })
        for (const itemResult of itemsResult) {
            invoice.addItem(
                itemResult.id,
                itemResult.name,
                itemResult.price
            )           
        }
        return invoice
    }
}
