import { SearchParameter } from './search-parameter';

export class BookingModel {
  searchParameter: SearchParameter;
  selectedTrips: selectedTrip [];

  constructor(searchParameter: SearchParameter, selectedTrips: selectedTrip[]){
    this.searchParameter = searchParameter;
    this.selectedTrips = selectedTrips;
  }
}


export class selectedTrip{
  tripId: string;
  passengerChoices : PasssengerChoice [];
}

export class PasssengerChoice{
  gender: string;
  discount: string;
  accommodation: string;
}

