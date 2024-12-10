import Event from "../../domain/@shared/event/Event"
import EventHandler from "../../domain/@shared/event/EventHandler"
import Observer from "../../domain/@shared/event/Observer"

export class EventObserver implements Observer {
    private _handlers: EventHandler[]

    constructor() {
        this._handlers = []
    }

    get handlers(): EventHandler[] {
        return this._handlers
    }

    register(eventHander: EventHandler): void {
        this._handlers.push(eventHander)
    }


    unregister(eventHander: EventHandler): void {
        const index = this._handlers.indexOf(eventHander)
        if (index > -1) {
            this._handlers.splice(index, 1)
        }
    }

    notify(eventName: string, event: Event): void {
        for (const hander of this._handlers) {
            if (hander.eventName === eventName) {
                hander.handleEvent(event)
            }
        }
    }
}
