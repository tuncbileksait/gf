import { AvailabilityType } from "../../enums/availability-type.enum";
import { SpecificType } from "../../enums/specific-type.enum";
import { Accommodation } from "./accommodation";
import { PassengerType } from "./passenger-type";

export class AccommodationAvailability {

  accommodation:	Accommodation;
  availabilityType:	AvailabilityType;
  specificType:	SpecificType;
  adultBasePrice: number;
  wholeBerthAvailability: number;
  maleBerthAvailability: number;
  femaleBerthAvailability: number;
  priceList1:	string;
  priceList2:	string;
  passengerType:	PassengerType;


}
