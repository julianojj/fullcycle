import Event from "../../../domain/@shared/event/Event";
import EventHandler from "../../../domain/@shared/event/EventHandler";

export default class EnviaConsoleLogHandler implements EventHandler {
    eventName = 'CustomerAddressChanged'
    
    handleEvent(event: Event): void {
        console.log(`Endereço do cliente: ${event.data.customerId}, ${event.data.name} alterado para: ${event.data.address}`)
    }
}
