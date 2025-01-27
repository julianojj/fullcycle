import { Invoice } from '../domain/invoice'

export interface InvoiceGateway {
    save(invoice: Invoice): Promise<void>
    find(id: string): Promise<Invoice>
}
