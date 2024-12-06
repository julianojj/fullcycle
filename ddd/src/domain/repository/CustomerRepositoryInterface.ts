import { Customer } from '../entity/Customer'
import { Repository } from './Repository'

export interface CustomerRepositoryInterface extends Repository<Customer> { }
