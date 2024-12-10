import EventHandler from '../../../domain/@shared/event/EventHandler'

export default class EnviaConsoleLog2Handler implements EventHandler {

    eventName = 'CustomerCreated'

    handleEvent(event: any): void {
        console.log('Esse é o segundo console.log do evento: CustomerCreated')
    }
}
