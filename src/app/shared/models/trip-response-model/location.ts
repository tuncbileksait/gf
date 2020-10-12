import { Area } from './area';
import { LocationInformation } from './location-information';
import { Country } from './country';
import { LocationType } from '../../enums/location-type.enum';

export class Location {
  idOrCode: string; //The location’s id or code.
  name: string; // The location’s name.
  country: Country;
  locationType: LocationType; // The location’s type. Possible values are HARBOUR, GENERIC_LOCATION, BUS_STOP etc.
  latitude: number;
  longitude: number; //The location’s longitude.
  areas: Area[];
  locationInformation: LocationInformation;
}
