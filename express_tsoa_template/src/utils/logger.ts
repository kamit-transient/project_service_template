import { Logger } from "winston";

const winston = require('winston');
const { createLogger, format, transports } = winston;
const DailyRotateFile = require('winston-daily-rotate-file');


interface LogEntry {
    level: string;      // The log level (e.g., 'info', 'error', 'debug')
    message: string;    // The log message
    timestamp: string;  // The timestamp of when the log entry was created
    [key: string]: any; // Any other custom fields added to the log entry
}


// Define log format
const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }: LogEntry) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
);

// Create logger
export const logger: Logger = createLogger({
    level: 'info',
    format: logFormat,
    transports: [
        // Console transport for development
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            ),
            level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
        }),

        // File transport for production
        new DailyRotateFile({
            filename: 'logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '7d', // Rotate every 7 days
            zippedArchive: true,
            maxSize: '20m',
            level: process.env.NODE_ENV === 'production' ? 'info' : 'warn',
        }),
    ],
});

// Handling uncaught exceptions
logger.exceptions.handle(
    new transports.File({ filename: 'logs/exceptions.log' })
);

// Handling unhandled promise rejections
process.on('unhandledRejection', (ex) => {
    throw ex;
});

