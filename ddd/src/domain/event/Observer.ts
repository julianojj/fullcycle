import Event from "./Event"
import EventHandler from "./EventHandler"

export default interface Observer {
    notify(eventName: string, event: Event): void
    register(eventHander: EventHandler): void
    unregister(eventHander: EventHandler): void
}
