import { Subjects, Publisher, ExpirationCompleteEvent } from "@tmatta-tickets/common";


export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationCompleteEvent;
}