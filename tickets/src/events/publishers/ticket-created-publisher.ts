import { Publisher, Subjects, TicketCreatedEvent } from '@tmatta-tickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
