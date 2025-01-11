import { NotificationErrorProps } from './notification'

export class NotificationError extends Error {
    constructor(public errors: NotificationErrorProps[]) {
        let message = ''
        for (const error of errors) {
            message += `${error.context}: ${error.message},`
        }
        super(message)
    }
}
