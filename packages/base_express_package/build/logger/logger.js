"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston = require('winston');
const { createLogger, format, transports } = winston;
const DailyRotateFile = require('winston-daily-rotate-file');
// Define log format
const logFormat = format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`));
// Create logger
exports.logger = createLogger({
    level: 'info',
    format: logFormat,
    transports: [
        // Console transport for development
        new transports.Console({
            format: format.combine(format.colorize(), format.simple()),
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
exports.logger.exceptions.handle(new transports.File({ filename: 'logs/exceptions.log' }));
// Handling unhandled promise rejections
process.on('unhandledRejection', (ex) => {
    throw ex;
});
