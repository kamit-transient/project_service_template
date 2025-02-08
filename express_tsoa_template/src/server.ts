import "reflect-metadata";
import dotenvFlow from 'dotenv-flow';
dotenvFlow.config();
import { app } from "./app";
import { dataSource } from "./databases";
import { connect, closeConnection } from "./config/rabbitmq";
import { logger } from "./utils/logger";
import https from 'https';
import fs from 'fs';
import path from 'path';

const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

function startServer() {
    dataSource.initialize().then(async () => {
        logger.info("Database connection established...");

        connect()
            .then(() => {
                logger.info("RabbitMQ connection established...");

                if (isProduction && process.env.SSL_CERT && process.env.SSL_KEY) {
                    const sslOptions = {
                        cert: fs.readFileSync(process.env.SSL_CERT),
                        key: fs.readFileSync(process.env.SSL_KEY)
                    };

                    https.createServer(sslOptions, app).listen(port, () =>
                        logger.info(`Server started: https://localhost:${port}`)
                    );
                } else {
                    app.listen(port, () =>
                        logger.info(`Server started: http://localhost:${port}`)
                    );
                }
            }).catch((e) => {
                logger.error("Error connecting to RabbitMQ: ", e);
            })
    }).catch((error: unknown) => {
        logger.error("Error initializing database: ", error);
    })
}

// Graceful shutdown
process.on('SIGINT', async () => {
    logger.info('Shutting down server...');
    await closeConnection();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    logger.info('Shutting down server...');
    await closeConnection();
    process.exit(0);
});

process.on("uncaughtException", (e: Error) => {
    logger.error('Uncaught Exception: ', e);
});

startServer();
