import { Location } from './location';
import { Vessel } from './vessel';
import { IntermediateStop } from './intermediate-stop';
import { AccommodationAvailability } from './accommodation-availability';
import { AdditionalService } from './additional-service';
import { AccommodationRequest } from './accommodation-request';
import { Ticket } from './ticket';
import { Price } from './price';
import { Passenger } from './passenger';
import { Vehicle } from './vehicle';
import { BookingValidation } from './booking-validation';

export class Trip {

  code: string;
  message: string;
  severeError: boolean;
  departureDateTime : string; //The format is YYYY-MM-DD HH:MM.
  departureDateTimeWithTimezone: string; //The format is YYYY-MM-DD’T’HH:MM:SS.SSZZ.
  arrivalDateTime: string; //The format is YYYY-MM-DD HH:MM.
  arrivalDateTimeWithTimezone: string; //The format is YYYY-MM-DD’T’HH:MM:SS.SSZZ.
  duration: number; //The duration of the trip, in minutes
  origin: Location;
  destination: Location;
  vessel: Vessel;
  seasonName: string;
  accommodationAvailabilities: AccommodationAvailability[];
  intermediateStops: IntermediateStop[];
  additionalServices: AdditionalService[];
  accommodationRequests: AccommodationRequest[];
  prices: Price[];
  discountPrices: Price[];
  tickets: Ticket;
  companyReservationCode: string; //Optional. The booking’s unique identification number at the operator’s system. Used in doBooking method.
  companyReservationCodeAccessCode: string; //Optional. Used in doBooking method for some companies. The access code of the booking in the operator’s system.
  remarks: string;
  optionDateTime: string;
  passengers: Passenger[];
  vehicles: Vehicle;
  basicPrice: number; // basic price of the quote
  discountPrice: number; //price of the quote with possible discount
  bookingValidation: BookingValidation;

}
