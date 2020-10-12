import { PassengerType } from './passenger-type';
import { Fare } from './fare';
import { VesselDictionary } from './vessel-dictionary';
import { AccommodationDictionary } from './accommodation-dictionary';
import { DiscountDictionary } from './discount-dictionary';

export class CompanyDictionary {
  name: string;
  imageUrl: string;
  accommodations: AccommodationDictionary;
  discounts: DiscountDictionary;
  fareCodes: Map<string, Fare>;
  passengerTypes: Map<string, PassengerType>;
  vessels: Map<string, VesselDictionary>;
  paymentFlowId: number;
}
