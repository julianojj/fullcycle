import { UseCase } from '../../../@shared/usecases/use-case.interface'
import { InvoiceGateway } from '../../gateway/invoice-gateway'
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from './find-invoice.usecase.dto'

export class FindInvoiceUsecase implements UseCase {
    private _invoiceRepository: InvoiceGateway

    constructor(
        invoiceRepository: InvoiceGateway
    ) {
        this._invoiceRepository = invoiceRepository
    }

    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        const invoice = await this._invoiceRepository.find(input.id)
        if (!invoice) throw new Error('invoice not found')
        return {
            id: invoice.id,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
            },
            items: invoice.items.map(item => ({ id: item.id, name: item.name, price: item.price })),
            total: invoice.getTotal(),
            createdAt: invoice.createdAt
        }       
    }
}
