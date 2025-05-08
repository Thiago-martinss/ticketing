import { Publisher, Subjects, OrderCreatedEvent } from "@tmatta-tickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}

