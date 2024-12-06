import { OrderPlacedEvent } from "./domain/event/Event"
import { EventObserver } from "./infra/event/EventObserver"
import { SendEmailWhenOrderPlaced } from "./infra/event/SendEmailWhenOrderPlaced"

const observer = new EventObserver()
const hander = new SendEmailWhenOrderPlaced()
observer.register(hander)
const event = new OrderPlacedEvent({
    customerId: '1',
    orderId: '1',
    items: [],
    total: 0,
    email: 'test@example.com'
})
observer.notify('OrderPlaced', event)
