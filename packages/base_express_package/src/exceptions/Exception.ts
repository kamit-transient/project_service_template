export class AppException extends Error {
    public status: number;
    public details?: object;

    constructor(message: string, status: number, details?: object) {
        super(message);
        this.status = status;
        this.details = details;
    }
}

export class EntityException extends AppException {
    constructor(message: string) { super(message, 500); }
}

export class BadRequestException extends AppException {
    constructor(message: string = "Bad Request") { super(message, 400); }
}

export class InternalServerException extends AppException {
    constructor(message: string = "Internal Server Error") { super(message, 500); }
}

export class ForbiddenException extends AppException {
    constructor(message: string = "UnAuthorized") { super(message, 403); }
}

export class NotFoundException extends AppException {
    constructor(message: string = "UnAuthorized") { super(message, 403); }
}

export class UnAuthenticatedException extends AppException {
    constructor(message: string = "UnAuthenticated") { super(message, 401); }
}

export class AppHttpException {
    public status: number;
    public message: string | object;
    constructor(status: number, message?: string | object) {
        this.status = status;
        this.message = message!;
    }
}
