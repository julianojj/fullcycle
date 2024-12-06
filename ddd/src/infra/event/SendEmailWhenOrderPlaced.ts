import Event from '../../domain/event/Event'
import EventHandler from '../../domain/event/EventHandler'

export class SendEmailWhenOrderPlaced implements EventHandler {
    eventName = 'OrderPlaced'

    handleEvent(event: Event): void {
        console.log(`Send email with event ${JSON.stringify(event)}`)
    }
}
