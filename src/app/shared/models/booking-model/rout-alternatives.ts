import { HarbourLocation } from './harbour-location';

export class RoutAlternatives {
  origin: HarbourLocation;
  destinations: HarbourLocation[] = [];
  date: Date;
  dateReturn: Date;
}
