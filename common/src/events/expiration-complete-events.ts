import { Subjects } from "./subjects";

export interface ExpirationCompleteEvent {
  subject: Subjects.ExpirationCompleteEvent;
  data: {
    orderId: string;
  };
}