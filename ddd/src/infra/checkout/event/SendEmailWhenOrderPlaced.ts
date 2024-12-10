import Event from '../../../domain/@shared/event/Event'
import EventHandler from '../../../domain/@shared/event/EventHandler'

export class SendEmailWhenOrderPlaced implements EventHandler {
    eventName = 'OrderPlaced'

    handleEvent(event: Event): void {
        console.log(`Send email with event ${JSON.stringify(event)}`)
    }
}
