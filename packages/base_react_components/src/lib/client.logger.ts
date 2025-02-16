let logger = {
    info: (message: string, ...other: any[]) => console.log(`[INFO]: ${message}`, ...other),
    error: (message: string, ...other: any[]) => console.error(`[ERROR]: ${message}`, ...other),
    debug: (message: string, ...other: any[]) => console.debug(`[DEBUG]: ${message}`, ...other),
    warn: (message: string, ...other: any[]) => console.warn(`[WARN]: ${message}`, ...other),
};

export { logger }