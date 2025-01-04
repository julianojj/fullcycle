export type CreateCustomerInput = {
    name: string
    street: string
    city: string
    state: string
    zipCode: string
}

export type CreateCustomerOutput = {
    customerId: string
}
