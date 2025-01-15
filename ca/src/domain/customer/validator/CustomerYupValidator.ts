import * as yup from 'yup'
import { ExceptionMessages } from '../../../exception/ValidationException'
import { Validator } from '../../validator/Validator'
import { Customer } from '../entity/Customer'

export class CustomerYupValidator implements Validator<Customer> {

    validate(entity: Customer): void {
        const schema = yup.object().shape({
            id: yup.string().required(ExceptionMessages.ErrRequiredCustomerId.message),
            name: yup.string().required(ExceptionMessages.ErrRequiredCustomerName.message),
            address: yup.object().shape({
                street: yup.string().required(ExceptionMessages.ErrRequiredStreet.message),
                city: yup.string().required(ExceptionMessages.ErrRequiredCity.message),
                state: yup.string().required(ExceptionMessages.ErrRequiredState.message),
                zipCode: yup.string().required(ExceptionMessages.ErrRequiredZipCode.message),
            }).required(ExceptionMessages.ErrRequiredAddress.message)
        })      
        try {
            schema.validateSync(entity, { abortEarly: false })
        } catch (errors) {
            const e = errors as yup.ValidationError
            e.errors.forEach(err => {
                entity.notification.addError({
                    message: err,
                    context: 'customer'
                })
            })
            
        }
    }
}
