import {
    Controller,
    Get,
    Route,
    Tags,
    Response,
} from "tsoa";
import { logger } from "../utils/logger";

interface HealthCheckResponse {
    status: string;
    timestamp: number;
    uptime: number;
}

@Route("/api/v1")
@Tags("health")
export class HealthController extends Controller {

    /**
     * Performs a health check of the service
     * @returns Health check information
     */
    @Get("/health")
    @Response<HealthCheckResponse>(200, "Successful health check")
    public async getHealth(): Promise<HealthCheckResponse> {
        try {
            // Basic health check with additional information
            const healthCheck: HealthCheckResponse = {
                status: "Ok",
                timestamp: Date.now(),
                uptime: process.uptime()
            };

            logger.info("Health check performed successfully");
            return healthCheck;
        } catch (error) {
            logger.error("Health check failed", error);
            this.setStatus(500);
            return {
                status: "Error",
                timestamp: Date.now(),
                uptime: process.uptime()
            };
        }
    }
}
