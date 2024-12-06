import Event from './Event'

export default interface EventHandler {
    eventName: string
    handleEvent(event: Event): void
}
