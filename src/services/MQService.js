import amqplib from 'amqplib'
import { generateRandomString } from '../helpers/generators'
import { getStateItem, setStateItem } from "../store/persistentStore";


export class MQService {

  constructor({ amqpUrl, parkingQueue, onProcessMessage }) {
    console.log('mqService init params', amqpUrl, parkingQueue)

    this.amqpUrl = amqpUrl
    this.parkingQueue = parkingQueue
    this.onProcessMessage = onProcessMessage
    this.clientTag = null // TODO: data about the browser?

    this.consume().then(() => {
      this.publish({
        longitude: 0,
        latitude: 0,
      })
    })
  }

  connect = async () => {
    if (this.connection) return
    this.connection = await amqplib.connect(this.amqpUrl, "heartbeat=60");
    this.channel = await this.connection.createChannel();

    process.once('SIGINT', async () => {
      console.log('got sigint, closing connection');
      await this.disconnect()
      process.exit(0);
    })
  }

  disconnect = async () => {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
  }

  consume = async () => {
    const existingQueue = await getStateItem("auth.clientMQID", null)
    const consumeQueue = existingQueue ?? generateRandomString(25)
    if (!existingQueue) {
      await setStateItem("auth.clientMQID", consumeQueue)
    }
    console.log('consume queue here', consumeQueue);
    await this.connect()
    // this.channel.prefetch(10);
    await this.channel.assertQueue(consumeQueue, { durable: false, autoDelete: true, exclusive: true });
    await this.channel.consume(consumeQueue, async (msg) => {
        await this.processMessage(msg);
        await this.channel.ack(msg);
      },
      {
        noAck: false,
        consumerTag: this.clientTag
      });
    console.log(`Message queue with id=${ consumeQueue } is ready to consume!`);
  }

  publish = async (message, shouldDisconnect = false) => {
    await this.connect()
    try {
      console.log('Sending request for data');
      // const exchange = 'user.signed_up';
      // const queue = 'user.sign_up_email';
      // const routingKey = 'sign_up_email';

      const exchange = '';
      const routingKey = '';

      await this.channel.assertExchange(exchange, 'direct', { durable: true });
      await this.channel.assertQueue(this.parkingQueue, { durable: true });
      await this.channel.bindQueue(this.parkingQueue, exchange, routingKey);

      await this.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
      console.log('Message published');
    } catch (e) {
      console.error('Error in publishing message => ', e);
    } finally {
      if (shouldDisconnect) {
        await this.disconnect()
      }
    }
  }

  processMessage = async (message) => {
    console.log('---------------------------------');
    try {
      const data = JSON.parse(message.content.toString());
      console.log('received message from parking service: ', data)
      if (this.onProcessMessage) {
        this.onProcessMessage(data)
      }
    } catch (error) {
      console.error('Could not parse message to json:\n' + error + '\nin: ' + message.content.toString());
    }
  }
}
