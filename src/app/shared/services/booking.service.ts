import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookingModel } from '../models/booking-model/booking-model';
import { TimeTableRequest } from '../models/requests/search-request';
import { TripsWithDictionary } from '../models/trip-response-model/trips-with-dictionary';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookingPhaseSource = new BehaviorSubject<number>(0);
  bookingPhase = this.bookingPhaseSource.asObservable();

  private customerBookingSource = new BehaviorSubject<BookingModel>(
    new BookingModel(null, [])
  );
  customerBookings = this.customerBookingSource.asObservable();

  constructor() {}

  changeBookingPhase(phase: number) {
    this.bookingPhaseSource.next(phase);
  }

  changeCustomerBooking(booking: BookingModel) {
    this.customerBookingSource.next(booking);
  }
}
