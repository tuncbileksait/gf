import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/shared/services/booking.service';
import { BookingModel } from '../shared/models/booking-model/booking-model';

@Component({
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  constructor(private bookingService: BookingService) { }

  ngOnDestroy(): void {
    this.customerBookingDetailsSub.unsubscribe();
    this.customerBookingDetailsSub.unsubscribe();
  }

  bookingPhase: number;
  bookingPhaseSub: Subscription;
  bookingModel: BookingModel;
  customerBookingDetailsSub: Subscription;

  ngOnInit() {
    this.customerBookingDetailsSub = this.bookingService.customerBookings.subscribe(details => this.bookingModel = details);
    this.bookingPhaseSub = this.bookingService.bookingPhase.subscribe(phase=> this.bookingPhase = phase);
  }

  changePhase(phase: number){
    this.bookingService.changeBookingPhase(phase);
  }

}
