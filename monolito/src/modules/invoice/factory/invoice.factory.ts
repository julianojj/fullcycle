import { InvoiceFacade } from '../facade/invoice.facade'
import { InvoiceFacadeInterface } from '../facade/invoice.facade.interface'
import { InvoiceRepository } from '../repository/invoice.repository'
import { FindInvoiceUsecase } from '../usecases/find-invoice/find-invoice.usecase'
import { GenerateInvoiceUsecase } from '../usecases/generate-invoice/generate-invoice.usecase'

export class InvoiceFacadeFactory {
    static create(): InvoiceFacadeInterface {
        const invoiceRepository = new InvoiceRepository()
        const generateInvoice = new GenerateInvoiceUsecase(invoiceRepository)
        const findInvoice = new FindInvoiceUsecase(invoiceRepository)
        return new InvoiceFacade(generateInvoice, findInvoice)
    }
}
