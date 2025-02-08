import envalid, { str, num, bool, cleanEnv } from 'envalid';

interface Env {
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    DB_SYNCHRONIZE: boolean;
    NODE_ENV: 'development' | 'production' | 'test';
    ORIGIN: string;
    RABBITMQ_USERNAME: string;
    RABBITMQ_PASSWORD: string;
    RABBITMQ_HOST: string;
    RABBITMQ_QUEUE_NAME_USER_SIGNUP: string;
    RABBITMQ_EXCHANGE_NAME_USER_SIGNUP: string;
    PRIVATE_INTERNAL_HEADER_NAME: string;
    PRIVATE_INTERNAL_HEADER_VALUE: string;
}

const env = cleanEnv(process.env, {
    DB_HOST: str({ default: "127.0.0.1", desc: 'The database host address (e.g., localhost, 127.0.0.1)' }),
    DB_PORT: num({ default: 5432, desc: 'The port number for the database connection (e.g., 5432 for PostgreSQL)' }),
    DB_USERNAME: str({ default: "authentik", desc: 'The username for the database connection' }),
    DB_PASSWORD: str({ default: "tyZBQTiZRKtwLx6VwKHtrHNg6Qj8NRfddP80d7Th", desc: 'The password for the database connection' }),
    DB_DATABASE: str({ default: 'comments', desc: 'The name of the database to connect to' }),
    DB_SYNCHRONIZE: bool({ default: false, desc: 'Whether to synchronize the database schema on startup (not recommended in production)' }),
    NODE_ENV: str({ choices: ['development', 'production', 'test'], default: 'development', desc: 'The environment in which the application is running' }),
    ORIGIN: str({ default: "http://localhost:8000", desc: 'The allowed origins for CORS' }),
    RABBITMQ_USERNAME: str({ desc: 'The username for RabbitMQ connection' }),
    RABBITMQ_PASSWORD: str({ desc: 'The password for RabbitMQ connection' }),
    RABBITMQ_HOST: str({ desc: 'The host for RabbitMQ connection' }),
    RABBITMQ_QUEUE_NAME_USER_SIGNUP: str({ desc: 'The queue name for user signup in RabbitMQ' }),
    RABBITMQ_EXCHANGE_NAME_USER_SIGNUP: str({ desc: 'The exchange name for user signup in RabbitMQ' }),
    PRIVATE_INTERNAL_HEADER_NAME: str({ desc: 'The name of the private internal header' }),
    PRIVATE_INTERNAL_HEADER_VALUE: str({ desc: 'The value of the private internal header' }),
}, {
    reporter: ({ errors }) => {
        if (Object.keys(errors).length > 0) {
            console.error('Environment variable validation errors:', errors);
            process.exit(1);
        }
    }
}) as Env;

export { env };
