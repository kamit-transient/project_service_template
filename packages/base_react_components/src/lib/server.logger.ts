import winston, { format, transports } from 'winston';
import { v4 as uuidv4 } from 'uuid'; // For generating trace and span IDs
import DailyRotateFile from 'winston-daily-rotate-file';

// Helper to determine the environment
const isProduction = process.env.NODE_ENV === 'production';
const isBrowser = typeof window !== 'undefined';

// Generate trace IDs
const generateTraceId = () => uuidv4();
const generateSpanId = () => uuidv4();

// Custom format to add trace and span IDs
const traceFormat = format((info) => {
    info.traceId = info.traceId || generateTraceId();
    info.spanId = info.spanId || generateSpanId();
    return info;
});

// Base logger configuration
let serverLogger = winston.createLogger({
    level: isProduction ? 'info' : 'debug',
    format: format.combine(
        traceFormat(), // Add trace and span information
        format.timestamp(), // Add timestamps
        format.json(), // Output as JSON
    ),
    defaultMeta: {
        environment: process.env.NODE_ENV || 'development',
    },
    transports: [
        // Console logging
        new transports.Console({
            format: isProduction
                ? format.json() // JSON logs for production
                : format.combine(
                    format.colorize(), // Add color in development
                    format.prettyPrint(), // Pretty-print logs for readability
                    format.printf(({ level, message, timestamp, traceId, spanId }) => {
                        return `[${timestamp}] ${level}: ${message} (traceId: ${traceId}, spanId: ${spanId})`;
                    }),
                ),
        }),
    ],
});


if (isProduction) {
    serverLogger.add(
        new DailyRotateFile({
            filename: './logs/%DATE%-app.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m', // Rotate logs when they exceed 20MB
            maxFiles: '14d', // Retain logs for 14 days
            format: winston.format.combine(
                winston.format.timestamp(), // Include timestamps
                winston.format.json() // Format logs as JSON
            ),
        }),
    );
}




// Add file logging for production
// if (isProduction) {
//   logger.add(
//     new transports.File({
//       filename: './logs/app.log',
//       format: format.json(), // JSON logs for better processing
//     }),
//   );
// }




// Helper to add trace context dynamically
export const withTraceContext = (context = {}) => {
    (serverLogger as winston.Logger).child({
        traceId: generateTraceId(),
        spanId: generateSpanId(),
        ...context,
    });
}

export default serverLogger;

