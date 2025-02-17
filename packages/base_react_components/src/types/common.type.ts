
export interface PaginatedRecords<T> {

    data: T[],
    totalCount: number,
    currentPage: number,
    pageSize: number,
    totalPages: number

}


// API Configuration Interface
export interface ApiConfig {
    baseUrl?: string;
    timeout?: number;
}

// Enhanced Error Classification
export enum ApiErrorType {
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    NETWORK_ERROR = 'NETWORK_ERROR',
    AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
    RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
    UNAUTHORIZED = 'UNAUTHORIZED',
    SERVER_ERROR = 'SERVER_ERROR',
    UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}
