import { Accommodation } from './accommodation';
import { Discount } from './discount';

export class PassengerType {
  type: string;
  name: string;
  description: string;
  minAge: number;
  maxAge: number;
  accomodations: Accommodation[];
  discounts: Discount[];
}
