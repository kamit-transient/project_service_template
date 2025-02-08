"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppHttpException = exports.UnAuthenticatedException = exports.NotFoundException = exports.ForbiddenException = exports.InternalServerException = exports.BadRequestException = exports.EntityException = exports.AppException = void 0;
class AppException extends Error {
    constructor(message, status, details) {
        super(message);
        this.status = status;
        this.details = details;
    }
}
exports.AppException = AppException;
class EntityException extends AppException {
    constructor(message) { super(message, 500); }
}
exports.EntityException = EntityException;
class BadRequestException extends AppException {
    constructor(message = "Bad Request") { super(message, 400); }
}
exports.BadRequestException = BadRequestException;
class InternalServerException extends AppException {
    constructor(message = "Internal Server Error") { super(message, 500); }
}
exports.InternalServerException = InternalServerException;
class ForbiddenException extends AppException {
    constructor(message = "UnAuthorized") { super(message, 403); }
}
exports.ForbiddenException = ForbiddenException;
class NotFoundException extends AppException {
    constructor(message = "UnAuthorized") { super(message, 403); }
}
exports.NotFoundException = NotFoundException;
class UnAuthenticatedException extends AppException {
    constructor(message = "UnAuthenticated") { super(message, 401); }
}
exports.UnAuthenticatedException = UnAuthenticatedException;
class AppHttpException {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }
}
exports.AppHttpException = AppHttpException;
