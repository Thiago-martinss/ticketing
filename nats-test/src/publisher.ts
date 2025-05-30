import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';
import { randomBytes } from 'crypto';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', async () => {
  console.log('Publisher connected to NATS');

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: '123',
      title: 'concert',
      price: 20,
    });
    /*
    const data = JSON.stringify({
      id: '123',
      title: 'concert',
      price: 20,
    });
    
 
  stan.publish('ticket:created', data, () => {
    console.log('Event published');
  });
  */
  } catch (err) {
    console.error(err);
  }
});
