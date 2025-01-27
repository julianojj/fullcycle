import { UseCase } from '../../@shared/usecases/use-case.interface'
import { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto, InvoiceFacadeInterface } from './invoice.facade.interface'

export class InvoiceFacade implements InvoiceFacadeInterface {

    private _generateFacadeUsecase: UseCase
    private _findInvoiceFacadeUsecase: UseCase

    constructor(
        generateInvoice: UseCase,
        findInvoice: UseCase
    ) {
        this._generateFacadeUsecase = generateInvoice
        this._findInvoiceFacadeUsecase = findInvoice        
    }

    async generateInvoice(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return this._generateFacadeUsecase.execute(input)
    }
    async findInvoice(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
        return this._findInvoiceFacadeUsecase.execute(input)
    }
}
