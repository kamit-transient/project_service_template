import { logger } from "../lib/client.logger";
import { appCache } from "../utils/cache";
import Cookies from 'js-cookie'
import { ApiError, ApiErrorType } from "./api.error";



const tokenCache = appCache!;
export class AppApi {
    api: string;
    headers: HeadersInit;
    constructor(args?: { jwt: string } | null) {
        let jwt = args?.jwt;
        this.api = process.env.NEXT_PUBLIC_API_URL!;
        let userInfoCookie = jwt;
        this.headers = { "Content-Type": "application/json", "authorization": `Bearer ${userInfoCookie}` }
    }

    // Centralized fetch method with enhanced error handling
    protected async fetchWithErrorHandling<T>(
        url: string,
        options: RequestInit = {}
    ): Promise<T> {
        const requestMethod = options.method || 'GET';

        try {
            // Detailed request logging
            logger.info('API Request Initiated', {
                url,
                method: requestMethod,
                headers: Object.keys(this.headers)
            });

            const response = await fetch(url, {
                ...options,
                headers: {
                    ...this.headers,
                    ...options.headers
                }
            });

            // Handle non-successful responses
            if (!response.ok) {
                const errorBody = await response.text();
                const errorType = ApiError.classifyError(response.status);

                const apiError = new ApiError(`Request failed: ${response.statusText}`, {
                    statusCode: response.status,
                    errorType,
                    context: {
                        url,
                        method: requestMethod,
                        responseBody: errorBody
                    }
                });

                // Detailed error logging
                logger.error('API Request Failed', {
                    error: apiError.toJSON(),
                    requestDetails: {
                        url,
                        method: requestMethod
                    }
                });

                throw apiError;
            }

            // Parse and return response
            const data = await response.json();

            // Response logging
            logger.info('API Response Received', {
                url,
                method: requestMethod,
                responseType: typeof data,
                status: response.status
            });

            return data;
        } catch (error) {
            // Handle different types of errors
            if (error instanceof ApiError) {
                throw error;
            }

            // Unexpected error handling
            const unexpectedError = new ApiError('Unexpected API error occurred', {
                errorType: ApiErrorType.NETWORK_ERROR,
                context: {
                    originalError: error instanceof Error ? error.message : String(error)
                }
            });

            logger.error('Unexpected API Error', {
                error: unexpectedError.toJSON()
            });

            throw unexpectedError;
        }
    }


}

