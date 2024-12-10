import { OrderPlacedEvent } from "./domain/@shared/event/Event"
import { SendEmailWhenOrderPlaced } from "./infra/checkout/event/SendEmailWhenOrderPlaced"
import { EventObserver } from "./infra/event/EventObserver"

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
