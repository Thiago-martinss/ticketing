import request from 'supertest';
import { app } from '../../app';
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../nats-wrapper';

it('marks an order as cancelled', async () => {
  // Create a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    id:'232323'
    
  });
  await ticket.save();

  const userOne = global.signin();
  // Make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', userOne)
    .send({ ticketId: ticket.id })
    .expect(201);
  // Make a request to delete the order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', userOne)
    .send()
    .expect(204);
  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('emits an order cancelled event', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    id:'232323'

  });
  await ticket.save();

  const userOne = global.signin();
  // Make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', userOne)
    .send({ ticketId: ticket.id })
    .expect(201);
  // Make a request to delete the order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', userOne)
    .send()
    .expect(204);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});