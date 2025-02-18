import { ApiErrorType } from "../types/common.type";

// Comprehensive Error Class for API Interactions
export class ApiError extends Error {

    public readonly statusCode?: number;
    public readonly errorType: ApiErrorType;
    public readonly context?: Record<string, any>;

    constructor(
        message: string,
        options: {
            statusCode?: number,
            errorType?: ApiErrorType,
            context?: Record<string, any>
        } = {}
    ) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = options.statusCode;
        this.errorType = options.errorType ?? ApiErrorType.UNKNOWN_ERROR;
        this.context = options.context;
        // Ensure proper stack trace
        // Ensure proper stack trace
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            // Fallback for environments where Error.captureStackTrace is not available
            this.stack = (new Error()).stack;
        }
    }

    // Method to classify error based on status code
    static classifyError(statusCode?: number): ApiErrorType {
        if (!statusCode) return ApiErrorType.UNKNOWN_ERROR;

        switch (true) {
            case statusCode >= 400 && statusCode < 500:
                switch (statusCode) {
                    case 400: return ApiErrorType.VALIDATION_ERROR;
                    case 401: return ApiErrorType.AUTHENTICATION_ERROR;
                    case 403: return ApiErrorType.UNAUTHORIZED;
                    case 404: return ApiErrorType.RESOURCE_NOT_FOUND;
                    default: return ApiErrorType.UNKNOWN_ERROR;
                }
            case statusCode >= 500:
                return ApiErrorType.SERVER_ERROR;
            default:
                return ApiErrorType.UNKNOWN_ERROR;
        }
    }

    // Detailed error serialization
    toJSON() {
        return {
            message: this.message,
            name: this.name,
            statusCode: this.statusCode,
            errorType: this.errorType,
            stack: this.stack,
            context: this.context,
        };
    }
}
