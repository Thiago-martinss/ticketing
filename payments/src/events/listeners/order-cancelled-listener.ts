import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { OrderCancelledEvent, OrderStatus, Subjects, Listener } from "@tmatta-tickets/common";
import { Order } from "../../models/order";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

 async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const order = await Order.findById(data.id);

    if (!order) {
      throw new Error('Order not found');
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    msg.ack();
  }
}