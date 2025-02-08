import express, { json, NextFunction, urlencoded } from "express";
import { RegisterRoutes } from "./swagger/routes";
import { Response as ExResponse, Request as ExRequest } from "express";
import swaggerUi from "swagger-ui-express";
import { ValidateError } from "tsoa";
import helmet from "helmet";
import cors from 'cors';
import { env } from "./config";
import { rateLimit } from 'express-rate-limit';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import { logger } from "./utils/logger";

export const app = express();

// Use body parser to read sent json payloads
app.use(
    urlencoded({
        extended: true,
    })
);
app.use(json());
app.use(helmet());

app.use(cors({
    origin: env.ORIGIN.split(',').map(origin => origin.trim()),
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true, // Allow credentials
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
}));

app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));

app.use(compression());
app.use(cookieParser());

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
    console.log("registring swagger####");

    return res.send(
        swaggerUi.generateHTML(await import("./swagger/swagger.json"))
    );
});

RegisterRoutes(app);

app.use(function notFoundHandler(_req, res: ExResponse) {
    res.status(404).send({
        message: "Not Found",
    });
});

app.use(function errorHandler(
    err: unknown,
    req: ExRequest,
    res: ExResponse,
    next: NextFunction
): ExResponse | void {
    if (err instanceof ValidateError) {
        logger.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
            message: "Validation Failed",
            details: err?.fields,
        });
    }
    if (err instanceof Error) {
        let error = err as any;
        logger.error(`Error handling request for ${req.method} ${req.path}:`, error);
        return res.status(error.status || 500).json({
            message: error.message || "Internal Server Error",
            ...(error.details && { details: error.details })
        });
    }

    next();
});
