import express, { NextFunction, Request, Response } from 'express'
import { CheckoutFactory } from './modules/checkout/factory/checkout.factory'
import checkoutSequelize from './modules/checkout/repository/sequelize'
import { ClientAdmFacadeFactory } from './modules/client-adm/factory/client-adm.factory'
import clientAdmSequelize from './modules/client-adm/repository/sequelize'
import { InvoiceFacadeFactory } from './modules/invoice/factory/invoice.factory'
import invoiceSequelize from './modules/invoice/repository/sequelize'
import paymentSequelize from './modules/payment/repository/sequelize'
import { ProductAdmFacadeFactory } from './modules/product-adm/factory/product-adm.factory'
import productSequelize from './modules/product-adm/repository/sequelize'
import catalogSequelize from './modules/store-catalog/repository/sequelize'

const initdb = async () => {
    await checkoutSequelize.sync()
    await clientAdmSequelize.sync()
    await invoiceSequelize.sync()
    await paymentSequelize.sync()
    await catalogSequelize.sync()
    await productSequelize.sync()
}

(async () => {
    await initdb()
})()

const app = express()

app.use(express.json())


const productFacade = ProductAdmFacadeFactory.create()
const invoiceFacade = InvoiceFacadeFactory.create()
const clientFacade = ClientAdmFacadeFactory.create()
const checkoutFacade = CheckoutFactory.create()

app.post('/products', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const output = await productFacade.addProduct(req.body)
        res.status(201).json(output)
    } catch (err) {
        next(err)
    }
})

app.post('/clients', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const output = await clientFacade.addClient(req.body)
        res.status(201).json(output)
    } catch (err) {
        next(err)
    }
})

app.post('/checkout', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const output = await checkoutFacade.placeOrder(req.body)
        res.status(201).json(output)
    } catch (err) {
        next(err)
    }
})

app.get('/invoice/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const output = await invoiceFacade.findInvoice({
            id: req.params.id
        })
        res.status(200).json(output)
    } catch (err) {
        next(err)
    }
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    next()
    let message = 'internal server error'
    let status = 500
    if (
        err.message == 'client not found' ||
        err.message == 'Product not found' ||
        err.message == 'invoice not found'
    ) {
        message = err.message
        status = 404
    }
    if (
        err.message === 'no products selected' ||
        err.message === 'no stock available'
    ) {
        message = err.message
        status = 422
    }
    res.status(status).json({ message })
})

app.listen(3000)

export default app
