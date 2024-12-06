export default abstract class Event {
    data: any
    issued: Date

    constructor(data: any) {
        this.issued = new Date()
        this.data = data
    }
}

export class OrderPlacedEvent extends Event {
    constructor(data: any) {
        super(data)
    }
}

export class CustomerCreatedEvent extends Event {
    constructor(data: any) {
        super(data)
    }
}


export class CustomerAddressChangedEvent extends Event {
    constructor(data: any) {
        super(data)
    }
}
