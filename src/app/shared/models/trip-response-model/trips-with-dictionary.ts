import { CompanyDictionary } from './company-dictionary'
import { Location } from './location'
import { Trip } from './trip'

export class TripsWithDictionary {
  code: string;
  message: string;
  severeError: boolean;
  trips: Trip [];
  locations: Map<string, Location>;
  companies: Map<string, CompanyDictionary>;
}
