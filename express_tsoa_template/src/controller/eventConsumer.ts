import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { dataSource } from "../databases";
import { logger } from "../utils/logger";
import { Channel, ConsumeMessage } from "amqplib";
import { TenantEntity } from "../entities/tenant.entity";

export class EventConsumerController {
    private userRepository: Repository<UserEntity>;
    private tenantRepository: Repository<TenantEntity>;

    constructor() {
        this.userRepository = dataSource.getRepository(UserEntity);
        this.tenantRepository = dataSource.getRepository(TenantEntity);
    }

    /**
     * Handles user signup and update events from Casdoor.
     * @param channel - The AMQP channel to acknowledge or reject messages.
     * @returns An async function to process the message.
     */
    userSignupAndUserUpdateEventConsumer(channel: Channel) {
        return async (msg: ConsumeMessage | null) => {
            if (msg !== null) {
                logger.info(`[consumer] Received message: ${msg.content.toString()}`);

                if (msg.properties.contentType?.toLowerCase() === "application/json") {
                    try {
                        const payload = JSON.parse(msg.content.toString());
                        logger.info("[consumer] Real message from RabbitMQ:", payload);

                        const user = new UserEntity();
                        user.idpUserId = payload.user.id;
                        user.name = payload.user.human.displayName;
                        user.email = payload.user.human.email;
                        user.idpApplicationId = payload.authRequest.applicationId;
                        user.roles = payload.userGrants.map((r: any) => ({
                            idpProjectId: r.projectID,
                            roles: r.roles
                        }));

                        user.createdBy = payload.user.human.email;

                        const tenant = await this.tenantRepository.findOne({ where: { idpOrgId: payload.authRequest.requestedOrgId } });
                        if (tenant) {
                            user.tenant = tenant;
                            await this.userRepository.save(user);
                            logger.info(`[consumer] User ${user.idpUserId} saved successfully.`);
                        } else {
                            logger.error("[consumer] User signup event received without tenant or orgId:", payload);
                            channel.nack(msg, false, false);
                            return;
                        }

                        channel.ack(msg);
                    } catch (error) {
                        logger.error("[consumer] Error parsing or processing message:", error);
                        channel.nack(msg);
                    }
                } else {
                    logger.info("[consumer] Received message is not proper JSON:", msg.content.toString());
                    channel.nack(msg);
                }
            } else {
                logger.info('[consumer] Consumer cancelled by server');
            }
        };
    }
}
