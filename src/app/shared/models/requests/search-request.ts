import { Sorting } from '../../enums/sorting.enum';
import { SearchParameter } from '../booking-model/search-parameter';

export class TimeTableRequest {
  departureDate: string; //  The format is YYYY-MM-DD.
  // departureTime: string; //Optional. The hour of date, to search. Possible values are 0 to 23.
  originIdOrCode: string; //The abbreviation of the origin’s location (Location#idOrCode).
  destinationIdOrCode: string; // The abbreviation of the destination’s location (Location#idOrCode).
  sorting: string; //Sets the sorting type of results. Possible values are: BY_DEPARTURE_TIME, BY_ARRIVAL_TIME, BY_FASTEST_ROUTE.
  availabilityInformation: boolean; //Optional. Used, only, in doTrips method. Indicates on whether availability data and route analysis, is to be fetched. Valid values are 0 to 9.
  quoteRequest: {
    passengers: number;
    vehicles: number;
    pets: number;
  };

  constructor(searchParamete: SearchParameter, i: number) {
    if(i===1 && searchParamete.tripKind==1){
      this.departureDate = searchParamete.routes[0].dateReturn.toString().substring(0, 10);;
      this.originIdOrCode = searchParamete.routes[0].destination.idOrCode;
      this.destinationIdOrCode = searchParamete.routes[0].origin.idOrCode;
    } else{
      this.departureDate = searchParamete.routes[i].date.toString().substring(0, 10);;
      this.originIdOrCode = searchParamete.routes[i].origin.idOrCode;
      this.destinationIdOrCode = searchParamete.routes[i].destination.idOrCode;
    }
    this.sorting = Sorting.BY_DEPARTURE_TIME;
    this.availabilityInformation = true;
    this.quoteRequest = {
      passengers: searchParamete.passengerCount,
      vehicles: searchParamete.vehicleCount,
      pets: 0
    }
  }
}
