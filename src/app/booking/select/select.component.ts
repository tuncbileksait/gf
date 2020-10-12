import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookingModel } from 'src/app/shared/models/booking-model/booking-model';
import { TimeTableRequest } from 'src/app/shared/models/requests/search-request';
import { TripsWithDictionary } from 'src/app/shared/models/trip-response-model/trips-with-dictionary';
import { BookingService } from 'src/app/shared/services/booking.service';
import { DatabaseHandlerService } from 'src/app/shared/services/database-handler.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  constructor(private bookingService: BookingService, private fb: FormBuilder, private databaseHandlerService: DatabaseHandlerService) { }

  selectForm: FormGroup;
  bookingPhase: number;
  bookingPhaseSub: Subscription;
  bookingModel: BookingModel;
  customerBookingSub: Subscription;
  searchRespose: TripsWithDictionary;
  selectedTripId: string [] = [];

  ngOnInit() {
    this.customerBookingSub = this.bookingService.customerBookings.subscribe(details => this.bookingModel = details);
    this.bookingPhaseSub = this.bookingService.bookingPhase.subscribe(phase=> this.bookingPhase = phase);

    this.selectForm = this.fb.group({trips : new FormArray([])});
    for (let i=0 ; i<this.bookingModel.searchParameter.routes.length; i++){
      const request = new TimeTableRequest(this.bookingModel.searchParameter, i);
      console.log(request);
      // this.databaseHandlerService.postSearchRequest(request).subscribe(response=> console.log(response));
      // console.log(request);
    }

    // this.bookingService.postSearchRequest(request).then(response => {
    //   this.searchRespose = response;
    //   console.log(response);
    //   const journey = this.fb.group({
    //     tripAlternatives: this.fb.array([])
    //   });


      // TODO BURADA KALDIM VE BACKHAND'A GECTIM. CLASS YAPISI SU AN UYGUN BACKHAND KONTROLU YAPILMADI. FORM YENIDEN YAPILANDIRILMALI...


      // for (let i=0 ; i<this.searchRespose.length ; i++){
      //     const trip = this.formBuilder.group({
      //       tripId : new FormControl(null, Validators.required),
      //       passengerChoices : new FormArray([])
      //     });
      //     for(let p=0 ; p<this.customerBooking.customerSearch.passengerCount ; p++){
      //       const choice = this.formBuilder.group({
      //         gender: new FormControl(this.searchRespose[i].gender[0], Validators.required),
      //         discounts : new FormControl(this.searchRespose[i].discounts[0], Validators.required),
      //         accommodation : new FormControl(this.searchRespose[i].accommodationAlternatives[0].options[0].name, Validators.required),
      //       });
      //       (<FormArray>trip.get('passengerChoices')).push(choice);
      //     }
      //     (<FormArray>this.selectForm.get('trips')).push(trip);
      // }
    // });
  }

  onSubmit(){
    // console.log(this.selectForm.value.trips[0].gender, this.selectedTripId);
    // for(let i=0 ; i<this.customerBooking.customerSearch.trips.length ; i++){
    //   let choices : PasssengerChoice[] = [];
    //   for(let j=0 ; j<this.customerBooking.customerSearch.passengerCount ; j++){
    //     choices.push({
    //       gender: this.selectForm.value.trips[0].gender,
    //       discount: this.selectForm.value.trips[0].discount,
    //       accommodation: this.selectForm.value.trips[0].accommodationAlternative
    //     });
    //   }
    //   this.customerBooking.customerSelections.push({tripId: this.selectedTripId[i], passengerChoices: choices})
    // }

    this.bookingModel.selectedTrips.push(JSON.parse(JSON.stringify(this.selectForm.value)));
    this.bookingService.changeCustomerBooking(this.bookingModel);
    console.log('Select Pahse: ',this.bookingModel);
    this.bookingService.changeBookingPhase(2);
  }

  getTrips(){
    return (<FormArray>this.selectForm.get('trips')).controls;
  }

  getPassengerChoices(trip){
    return (<FormArray>trip.get('passengerChoices')).controls;
  }

  setSelectedTripId(i: number){
    this.selectedTripId[i] = this.searchRespose[i].tripId;
  }

  ngOnDestroy(): void {
    this.customerBookingSub.unsubscribe();
    this.customerBookingSub.unsubscribe();
  }
}
