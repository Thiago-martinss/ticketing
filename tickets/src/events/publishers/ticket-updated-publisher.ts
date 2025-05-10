import { Publisher, Subjects, TicketUpdatedEvent } from '@tmatta-tickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}


