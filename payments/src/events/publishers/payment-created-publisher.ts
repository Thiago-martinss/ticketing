import { Subjects, Publisher, PaymentCreatedEvent } from "@tmatta-tickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}

