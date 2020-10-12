import { PassengerData } from './passenger-data';
import { VehicleData } from './vehicle-data';

export class AccommodationRequestAnalysis {
  index: number;
  discountIdOrCode: string;
  discountDocument: string;
  specialType: string;
  loyaltyCard: string;
  promotionalCode: string;
  fareIdOrCode: string;
  passengerData: PassengerData;
  vehicleData: VehicleData;
}
