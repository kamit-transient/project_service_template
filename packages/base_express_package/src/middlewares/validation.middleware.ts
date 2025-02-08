import { ClassConstructor, plainToInstance } from "class-transformer";
import { IValidation } from "../types/ivalidation.type";
import { NextFunction } from "express";
import { AppException, BadRequestError } from "../exceptions/Exception";
import { Response, Request } from 'express'
import { validateSync } from "class-validator";
import { logger } from "../logger/logger";

export interface IValidate {
    body?: { schema: ClassConstructor<IValidation>; groups?: string[] },
    query?: { schema: ClassConstructor<IValidation>; groups?: string[] },
    params?: { schema: ClassConstructor<IValidation>; groups?: string[] }
}


export function validationMiddleware(schema: IValidate) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            logger.info('Starting request validation', {
                body: schema.body ? 'present' : 'not specified',
                query: schema.query ? 'present' : 'not specified',
                params: schema.params ? 'present' : 'not specified'
            });

            const { body, query, params } = schema;

            if (body) {
                logger.debug('Validating request body', { schema: body.schema.name, groups: body.groups });
                await validate(body.schema, req.body, body.groups);
            }

            if (query) {
                logger.debug('Validating request query', { schema: query.schema.name, groups: query.groups });
                await validate(query.schema, req.query, query.groups);
            }

            if (params) {
                logger.debug('Validating request params', { schema: params.schema.name, groups: params.groups });
                await validate(params.schema, req.params, params.groups);
            }

            logger.info('Request validation completed successfully');
            next();

        } catch (error: any) {
            const status = error.status || 500;
            const msg: string = (error.message as any) || 'Oops something wrong happened..';

            logger.error('Request validation failed', {
                status,
                message: msg,
                details: error.details
            });

            return res.status(status).json(new AppException(msg, status, error.details));
        }
    };
}

/**

* if schema is valid do nothing, throw error otherwise.

* @param classs

* @param val

* @param groups

*/

async function validate(classs: ClassConstructor<unknown>, val: any, groups?: string[]) {
    let instance: any;

    try {
        logger.debug('Transforming instance', {
            className: classs.name,
            groups: groups
        });

        instance = await plainToInstance(classs, val);

        const validationError = validateSync(instance, {
            strictGroups: true,
            validationError: { target: false, value: true },
            ...(groups && groups.length > 0 && { groups }),
        });

        if (validationError.length > 0) {
            logger.warn('Validation errors detected', {
                errorCount: validationError.length
            });

            let valResult = extractConstraints(validationError);

            logger.debug('Validation error details', {
                errorMap: valResult
            });

            throw new AppException("Validation error", 400, valResult);
        }

        logger.info('Validation passed successfully');

    } catch (error: any) {
        logger.error('Validation failed', {
            message: error.message,
            status: error.status || 400
        });

        throw new AppException(error.message, error.status || 400, error.details);
    }
}

function extractConstraints(validationError: any) {
    const errorMap = {} as any

    function traverseErrors(errors: any[]) {
        errors.forEach((error) => {
            if (error.constraints) {
                errorMap[error.property] = [...(errorMap[error.property] || []), ...Object.keys(error.constraints).map((k) => error.constraints[k])];
            }

            if (error.children && error.children.length > 0) {
                traverseErrors(error.children);
            }
        })
    }
    traverseErrors(validationError)
    return errorMap;
}
