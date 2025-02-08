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

export class BadRequestError extends AppException {
    constructor(message: string = "Bad Request") { super(message, 400); }
}

export class InternalServerError extends AppException {
    constructor(message: string = "Internal Server Error") { super(message, 500); }
}

export class ForbiddenError extends AppException {
    constructor(message: string = "UnAuthorized") { super(message, 403); }
}

export class UnAuthenticatedError extends AppException {
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
