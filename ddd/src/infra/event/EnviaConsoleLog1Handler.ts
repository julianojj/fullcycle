import EventHandler from '../../domain/event/EventHandler'

export default class EnviaConsoleLog1Handler implements EventHandler {

    eventName = 'CustomerCreated'

    handleEvent(event: any): void {
        console.log('Esse é o primeiro console.log do evento: CustomerCreated')
    }
}
