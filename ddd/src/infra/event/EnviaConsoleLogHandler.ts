import Event from "../../domain/event/Event";
import EventHandler from "../../domain/event/EventHandler";

export default class EnviaConsoleLogHandler implements EventHandler {
    eventName = 'CustomerAddressChanged'
    
    handleEvent(event: Event): void {
        console.log(`Endereço do cliente: ${event.data.customerId}, ${event.data.name} alterado para: ${event.data.address}`)
    }
}
