import { Discount } from './discount';

export class DiscountDictionary {
  vehicles: Map<string, Discount>;
  passengers: Map<string, Discount>;
}
