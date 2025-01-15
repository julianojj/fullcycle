import { Validator } from '../../validator/Validator'
import { Product } from '../entity/Product'
import { ProductYupValidator } from '../validator/ProductYupValidator'

export class ProductValidatorFactory {
    static create(): Validator<Product> {
        return new ProductYupValidator()
    }
}
