export class Logger {
    private static instance: Logger;

    private constructor() {}

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public log(message: string, ...optionalParams: any[]): void {
        console.log(message, ...optionalParams);
    }

    public error(message: string, ...optionalParams: any[]): void {
        console.error(message, ...optionalParams);
    }
}

export const logger = Logger.getInstance();