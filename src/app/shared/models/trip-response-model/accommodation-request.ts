import { AccommodationRequestType } from '../../enums/accommodation-request-type.enum';
import { BedType } from '../../enums/bed-type.enum';
import { AccommodationRequestAnalysis } from './accommodation-request-analysis';

export class AccommodationRequest {
  idOrCode: string;
  accommodationRequestType: AccommodationRequestType;
  quantity: number;
  bedType: BedType;
  accommodationRequestAnalysises: AccommodationRequestAnalysis[];
}
