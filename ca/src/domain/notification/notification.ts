export class Notification {
    private _errors: NotificationErrorProps[]

    constructor() {
        this._errors = []
    }

    addError(error: NotificationErrorProps): void {
        this._errors.push(error)
    }

    hasError(): boolean {
        return this._errors.length > 0
    }

    messages(context?: string): string {
        let message = ''
        for (const error of this._errors) {
            if (!context || error.context === context) {
                message += `${error.context}: ${error.message},`
            }
        }
        return message
    }

    errors(): NotificationErrorProps[] {
        return this._errors
    }
}

export type NotificationErrorProps = {
    message: string,
    context: string
}
