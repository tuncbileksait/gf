import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookingModel } from 'src/app/shared/models/booking-model/booking-model';
import { BookingService } from 'src/app/shared/services/booking.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private bookingService: BookingService) { }

  ngOnDestroy(): void {
    this.customerBookingSub.unsubscribe();
    this.customerBookingSub.unsubscribe();
  }

  bookingPhase: number;
  bookingPhaseSub: Subscription;
  bookingModel: BookingModel;
  customerBookingSub: Subscription;

  ngOnInit() {
    this.customerBookingSub = this.bookingService.customerBookings.subscribe(details => this.bookingModel = details);
    this.bookingPhaseSub = this.bookingService.bookingPhase.subscribe(phase=> this.bookingPhase = phase);
    console.log(this.bookingModel);
  }

}
