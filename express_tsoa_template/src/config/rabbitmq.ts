import amqp, { Channel, Connection } from "amqplib";
import { env } from ".";
import { logger } from "../utils/logger";
import { EventConsumerController } from "../controller/eventConsumer";

const rabbitmqConfig = {
    protocol: 'amqp',
    hostname: env.RABBITMQ_HOST,
    port: 5672,
    username: env.RABBITMQ_USERNAME,
    password: env.RABBITMQ_PASSWORD,
    // vhost: process.env.RABBITMQ_VHOST || '/',
};

let connection: Connection;
let channel: Channel;

const connect = async () => {
    try {
        connection = await amqp.connect(rabbitmqConfig);
        channel = await connection.createChannel();
        logger.info('Connected to RabbitMQ');

        const queueName = env.RABBITMQ_QUEUE_NAME_USER_SIGNUP;

        // Ensure the queue exists
        // await channel.assertQueue(queueName, { durable: true });

        let eventConsumer = new EventConsumerController();
        // Consume messages from the queue
        channel.assertExchange(env.RABBITMQ_EXCHANGE_NAME_USER_SIGNUP, "fanout", { durable: true });
        channel.assertQueue(env.RABBITMQ_QUEUE_NAME_USER_SIGNUP, { durable: true, });
        channel.bindQueue(env.RABBITMQ_QUEUE_NAME_USER_SIGNUP, env.RABBITMQ_EXCHANGE_NAME_USER_SIGNUP, "");


        // Set prefetch count to handle messages in batches
        const prefetchCount = 50; // Adjust this value as needed
        await channel.prefetch(prefetchCount);

        channel.consume(queueName, eventConsumer.userSignupAndUserUpdateEventConsumer(channel), { noAck: false });

        connection.on('close', () => {
            logger.info('RabbitMQ connection closed');
        });

        connection.on('error', (err) => {
            logger.error('RabbitMQ connection error', err);
        });
    } catch (error) {
        logger.error('Failed to connect to RabbitMQ', error);
        throw error;
    }
};

const getConnection = () => connection;

const getChannel = () => channel;

const closeConnection = async () => {
    try {
        if (channel) await channel.close();
        if (connection) await connection.close();
        console.log('Disconnected from RabbitMQ');
    } catch (error) {
        console.error('Failed to close RabbitMQ connection', error);
    }
};

export {
    connect,
    getConnection,
    getChannel,
    closeConnection,
};