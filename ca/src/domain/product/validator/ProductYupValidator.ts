import * as yup from 'yup'
import { ExceptionMessages } from '../../../exception/ValidationException'
import { Validator } from '../../validator/Validator'
import { Product } from '../entity/Product'

export class ProductYupValidator implements Validator<Product> {

    validate(entity: Product): void {
        const schema = yup.object().shape({
            id: yup.string().required(ExceptionMessages.ErrRequiredProductId.message),
            name: yup.string().required(ExceptionMessages.ErrRequiredProductName.message),
            price: yup.number().min(0, ExceptionMessages.ErrInvalidPrice.message)
        })      
        try {
            schema.validateSync(entity, { abortEarly: false })
        } catch (errors) {
            const e = errors as yup.ValidationError
            e.errors.forEach(err => {
                entity.notification.addError({
                    message: err,
                    context: 'product'
                })
            })
        }
    }
}
