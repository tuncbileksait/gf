import { SpecificType } from '../../enums/specific-type.enum';
import { Company } from './company';
import { Image } from './image';

export class Accommodation {
  idOrCode:	string;
  abbreviation:	string;
  name:	string;
  description:	string;
  type:	string;
  specificType:	SpecificType;
  capacity:	number;
  length:	number;
  maxLength:	number;
  height:	number;
  tripKindAllowed:	string;
  pricingPerMeter:	boolean;
  company:	Company;
  number:	string;
  bed:	string;
  exclusiveUse:	boolean;
  group:	string;
  external:	boolean;
  supportsTemplate:	boolean;
  images:	Image[];
}
