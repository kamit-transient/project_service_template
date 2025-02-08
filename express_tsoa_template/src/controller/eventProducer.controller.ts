import { Body, Header, Post, Res, Route, Tags, TsoaResponse } from "tsoa";
import { IResponse } from "../types/IResponse";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { dataSource } from "../databases";
import { logger } from "../utils/logger";
import { getChannel } from "../config/rabbitmq";
import { Channel } from "amqplib";
import { env } from "../config";

@Route("/api/v1/events")
@Tags("events")
export class EventProducerController {
    private userRepository: Repository<UserEntity>;
    private channel: Channel;

    constructor() {
        this.userRepository = dataSource.getRepository(UserEntity);
        this.channel = getChannel();
    }

    /**
     * Handles user signup and update events from Casdoor.
     * 
     * @summary Save user signed up with Casdoor to the comment DB.
     * @param payload - The user signup or update payload
     * @param secret - The internal service secret header
     * @param res - The response object for error handling
     * @returns A boolean indicating success
     */
    @Post("/accept-user-signup-and-update")
    async userSignupAndUserUpdateEventPublisher(@Body() payload: any, @Header("x-internal-service") secret: string, @Res() res: TsoaResponse<401 | 403, IResponse>): Promise<boolean> {
        try {
            logger.debug("[producer] Received user signup event from IDP...");
            if (secret !== env.PRIVATE_INTERNAL_HEADER_VALUE) {
                return res(403, { status: 403, message: "Oops!, This is a private property..." });
            }

            this.channel.assertExchange(env.RABBITMQ_EXCHANGE_NAME_USER_SIGNUP, "fanout", { durable: true });
            this.channel.assertQueue(env.RABBITMQ_QUEUE_NAME_USER_SIGNUP, { durable: true });
            this.channel.bindQueue(env.RABBITMQ_QUEUE_NAME_USER_SIGNUP, env.RABBITMQ_EXCHANGE_NAME_USER_SIGNUP, "");

            const date = new Date();
            this.channel.publish(env.RABBITMQ_EXCHANGE_NAME_USER_SIGNUP, '', Buffer.from(JSON.stringify(payload)), { persistent: true, contentType: 'application/json', timestamp: date.getTime(), appId: "comment-service" });

            logger.info("[producer] Published user signup event from IDP to queue:", payload);
            return true;
        } catch (error) {
            logger.error('[producer] Failed to publish message:', error);
            return false;
        }
    }
}
