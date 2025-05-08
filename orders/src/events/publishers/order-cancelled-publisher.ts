import { Subjects, Publisher, OrderCancelledEvent } from "@tmatta-tickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}