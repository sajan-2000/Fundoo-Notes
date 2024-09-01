import amqplib from 'amqplib';
import logger from '../config/logger';

const RABBITMQ_URL = 'amqp://localhost';

export async function connect() {
    try {
        const connection = await amqplib.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        return { connection, channel };
    } catch (error) {
        logger.logger.error('Failed to connect to RabbitMQ', error);
        throw error;
    }
}

export async function publish(queue, message) {
    const { connection, channel } = await connect();
    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(message));
    console.log(`--> Message sent to queue ${queue}: ${message}`);
    logger.logger.info(`Message sent to queue ${queue}: ${message}`);
    setTimeout(() => {
        connection.close();
    }, 500);
}
