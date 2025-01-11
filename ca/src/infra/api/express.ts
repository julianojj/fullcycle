import express, { NextFunction, Request, Response } from 'express'
import { NotFoundException, ValidationException } from '../../exception/ValidationException'
import CreateCustomer from '../../usecases/customer/create/CreateCustomer'
import { FindCustomer } from '../../usecases/customer/find/FindCustomer'
import { FindAllCustomers } from '../../usecases/customer/list/FindAllCustomers'
import { UpdateCustomer } from '../../usecases/customer/update/UpdateCustomer'
import { CreateProduct } from '../../usecases/product/create/CreateProduct'
import { FindProduct } from '../../usecases/product/find/FindProduct'
import { FindAllProducts } from '../../usecases/product/list/FindAllProducts'
import { UpdateProduct } from '../../usecases/product/update/UpdateProduct'
import { CustomerRepositoryDatabase } from '../customer/repository/database/CustomerRepositoryDatabase'
import CustomerModel from '../database/sequelize/model/CustomerModel'
import ProductModel from '../database/sequelize/model/ProductModel'
import { ProductRepositoryDatabase } from '../product/repository/database/ProductRepositoryDatabase'
import { CustomerRoute } from './routes/customer/CustomerRoute'
import { ProductRoute } from './routes/product/ProductRoute'

(async () => {
    await CustomerModel.sync({ force: true })
    await ProductModel.sync({ force: true })
})()

const app = express()
app.use(express.json())

const customerRepository = new CustomerRepositoryDatabase()
const productRepository = new ProductRepositoryDatabase()

const createCustomer = new CreateCustomer(customerRepository)
const findCustomer = new FindCustomer(customerRepository)
const findAllCustomers = new FindAllCustomers(customerRepository)
const updateCustomer = new UpdateCustomer(customerRepository)

const createProduct = new CreateProduct(productRepository)
const findProduct = new FindProduct(productRepository)
const findAllProducts = new FindAllProducts(productRepository)
const updateProduct = new UpdateProduct(productRepository)

new CustomerRoute(
    app,
    createCustomer,
    findCustomer,
    findAllCustomers,
    updateCustomer
).init()

new ProductRoute(
    app,
    createProduct,
    findProduct,
    findAllProducts,
    updateProduct
).init()

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    let message = 'Internal Server Error'
    let status = 500
    if (err instanceof ValidationException) {
        message = err.message
        status = 422
    }
    if (err instanceof NotFoundException) {
        message = err.message
        status = 404
    }
    res.status(status).json({ message })
    next()
})

export default app
