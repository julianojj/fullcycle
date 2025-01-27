import { UseCase } from '../../../@shared/usecases/use-case.interface'
import { Address } from '../../domain/address'
import { Invoice } from '../../domain/invoice'
import { InvoiceGateway } from '../../gateway/invoice-gateway'
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from './generate-invoice.usecase.dto'

export class GenerateInvoiceUsecase implements UseCase {
    private _invoiceGateway: InvoiceGateway

    constructor(
        invoiceGateway: InvoiceGateway
    ) {
        this._invoiceGateway = invoiceGateway
    }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const invoice = new Invoice({
            name: input.name,
            document: input.document,
            address: new Address(
                input.street,
                input.number,
                input.complement,
                input.city,
                input.state,
                input.zipCode,
            )
        })
        for (const item of input.items) {
            invoice.addItem(item.id, item.name, item.price)
        }
        await this._invoiceGateway.save(invoice)
        return {
            id: invoice.id,
            name: invoice.name,
            document: invoice.document,
            street: input.street,
            number: input.number,
            complement: input.complement,
            city: input.city,
            state: input.state,
            zipCode: input.zipCode,
            items: input.items,
            total: invoice.getTotal(),
        }
    }
}
