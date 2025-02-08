"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = validationMiddleware;
const class_transformer_1 = require("class-transformer");
const Exception_1 = require("../exceptions/Exception");
const class_validator_1 = require("class-validator");
const logger_1 = require("../logger/logger");
function validationMiddleware(schema) {
    return async function (req, res, next) {
        try {
            logger_1.logger.info('Starting request validation', {
                body: schema.body ? 'present' : 'not specified',
                query: schema.query ? 'present' : 'not specified',
                params: schema.params ? 'present' : 'not specified'
            });
            const { body, query, params } = schema;
            if (body) {
                logger_1.logger.debug('Validating request body', { schema: body.schema.name, groups: body.groups });
                await validate(body.schema, req.body, body.groups);
            }
            if (query) {
                logger_1.logger.debug('Validating request query', { schema: query.schema.name, groups: query.groups });
                await validate(query.schema, req.query, query.groups);
            }
            if (params) {
                logger_1.logger.debug('Validating request params', { schema: params.schema.name, groups: params.groups });
                await validate(params.schema, req.params, params.groups);
            }
            logger_1.logger.info('Request validation completed successfully');
            next();
        }
        catch (error) {
            const status = error.status || 500;
            const msg = error.message || 'Oops something wrong happened..';
            logger_1.logger.error('Request validation failed', {
                status,
                message: msg,
                details: error.details
            });
            return res.status(status).json(new Exception_1.AppException(msg, status, error.details));
        }
    };
}
/**

* if schema is valid do nothing, throw error otherwise.

* @param classs

* @param val

* @param groups

*/
async function validate(classs, val, groups) {
    let instance;
    try {
        logger_1.logger.debug('Transforming instance', {
            className: classs.name,
            groups: groups
        });
        instance = await (0, class_transformer_1.plainToInstance)(classs, val);
        const validationError = (0, class_validator_1.validateSync)(instance, {
            strictGroups: true,
            validationError: { target: false, value: true },
            ...(groups && groups.length > 0 && { groups }),
        });
        if (validationError.length > 0) {
            logger_1.logger.warn('Validation errors detected', {
                errorCount: validationError.length
            });
            let valResult = extractConstraints(validationError);
            logger_1.logger.debug('Validation error details', {
                errorMap: valResult
            });
            throw new Exception_1.AppException("Validation error", 400, valResult);
        }
        logger_1.logger.info('Validation passed successfully');
    }
    catch (error) {
        logger_1.logger.error('Validation failed', {
            message: error.message,
            status: error.status || 400
        });
        throw new Exception_1.AppException(error.message, error.status || 400, error.details);
    }
}
function extractConstraints(validationError) {
    const errorMap = {};
    function traverseErrors(errors) {
        errors.forEach((error) => {
            if (error.constraints) {
                errorMap[error.property] = [...(errorMap[error.property] || []), ...Object.keys(error.constraints).map((k) => error.constraints[k])];
            }
            if (error.children && error.children.length > 0) {
                traverseErrors(error.children);
            }
        });
    }
    traverseErrors(validationError);
    return errorMap;
}
