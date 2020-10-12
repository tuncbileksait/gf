import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/shared/services/booking.service';
import { DatabaseHandlerService } from 'src/app/shared/services/database-handler.service';
import { BookingModel } from 'src/app/shared/models/booking-model/booking-model';
import { HarbourLocation } from 'src/app/shared/models/booking-model/harbour-location';
import { RoutAlternatives } from 'src/app/shared/models/booking-model/rout-alternatives';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  /**
   * Su an FROM To verileri database'den otomatik geliyor. From secenegine gore To alternatifleri sorunsuz gosteriliyor.
   * Ancak coklu seyahatte sonraki satir otomatik olarak onceki yolculuga gore sekillenmiyor. Cok ugrastim olmadi.
   * Vakit kalirsa en son yapilir. Bu haliyle dahi sayfa yayinlanabilir.
   */


  constructor(private databaseHandlerService: DatabaseHandlerService,
              private bookingService: BookingService,
              private formBuilder: FormBuilder) {}

  searchForm: FormGroup;
  bookingPhase: number;
  bookingPhaseSub: Subscription;
  bookingModel: BookingModel;
  customerBookingSub: Subscription;
  tripsCount: number = -1;
  passengerCountArray: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  vehicleCountArray: number[] = [0, 1, 2, 3, 4, 5];
  tripDateIndex: number = -1;
  tripCodeWithIndex: Map<number,string> = new Map<number,string>();
  minDateArray: Date[] = [];
  maxDateArray: Date[] = [];

  routeDictionary: RoutAlternatives[] = [];
  originOptions: HarbourLocation [][] = [];
  destinatonOptions: HarbourLocation [][] = [];

  ngOnInit(): void {
    this.customerBookingSub = this.bookingService.customerBookings.subscribe(details => this.bookingModel = details);
    this.bookingPhaseSub = this.bookingService.bookingPhase.subscribe(phase=> this.bookingPhase = phase);
    this.searchForm = this.formBuilder.group({
      tripKind: new FormControl(0, Validators.required),
      passengerCount: new FormControl(1, Validators.required),
      vehicleCount: new FormControl(0, Validators.required),
      routes: new FormArray ([]),
    })
    if(this.databaseHandlerService.routeDictionary.length<3){
      this.databaseHandlerService.setLocations().subscribe(response=>{
        console.log(response);
        this.routeDictionary = this.databaseHandlerService.getRouteDictionary();
        this.createForm();
      });
    } else {
      this.routeDictionary = this.databaseHandlerService.getRouteDictionary();
      this.createForm();
    };
    if(this.databaseHandlerService.routeFrequencyDictionary.size==0) this.databaseHandlerService.setRouteFrequencyDictionary();
  }
  setOldEntries() {
    // TODO this method loads customers old selections. Sadece Booking component da olacak.
    // Home'da bu ozellik olmayacak. Musteri ne zaman homa donse bos bir template ile karsilasacak.
  }

  onSubmit(){
    this.bookingModel.searchParameter = JSON.parse(JSON.stringify(this.searchForm.value));
    console.log('Search Result: ', this.bookingModel);
    this.bookingService.changeBookingPhase(1);
  }

  createForm(){
    if(this.bookingModel.searchParameter == null){
      this.addTrip();
    } else{
      this.setOldEntries();
      this.addTrip(); // silinecek
    }
  }

  tripKindChange(event){
    const value = Math.abs(this.tripsCount - event.value);
    for(let i= 0 ; i < value ; i++){
      if(this.tripsCount < event.value){
        this.addTrip();
      } else {
        this.removeTrip();
      }
    }
    this.tripsCount == event.value;
  }

  addTrip(){
    this.tripsCount++;
    this.originOptions.push(this.databaseHandlerService.getOrigins());
    this.addMaxandMinDates();
    let trip: AbstractControl;
    if(this.tripsCount>0){
      if (this.searchForm.value.routes[ this.tripsCount-1].destination == null){
        this.destinatonOptions.push(this.databaseHandlerService.getOrigins());
      } else {
        this.destinatonOptions.push(this.databaseHandlerService.getOrigins());
        // this.destinatonOptions.push(this.datadaseHandlerService.getDestinationOptions(this.searchForm.value.routes[this.tripsCount-1].destination));
      }
        trip = this.formBuilder.group({
          origin: new FormControl(this.searchForm.value.routes[this.tripsCount-1].destination),
          destination: new FormControl(null),
          date: new FormControl(null)
        });

    }else{
      this.destinatonOptions.push(this.databaseHandlerService.getOrigins());
      trip = this.formBuilder.group({
        origin: new FormControl(null, Validators.required),
        destination: new FormControl(null, Validators.required),
        date: new FormControl(null, Validators.required),
        dateReturn: new FormControl(null)
      });
    }
    (<FormArray>this.searchForm.get('routes')).push(trip);
    console.log("tripsCount :", this.tripsCount);
  }

  removeTrip(){
    this.tripsCount--;
    this.originOptions.pop();
    this.destinatonOptions.pop();
    const trips = (<FormArray>this.searchForm.get('routes'));
    trips.removeAt(trips.length-1);
    this.maxDateArray.pop();
    this.minDateArray.pop();
    this.maxDateArray[this.maxDateArray.length-1] = new Date(new Date().getFullYear()+2, 0, 0);
    console.log("tripsCount :", this.tripsCount);
  }

  getTrips(){
    return (<FormArray>this.searchForm.get('routes')).controls;
  }

  setDestinations(e: Event, index:number) {
    this.destinatonOptions[index] = this.databaseHandlerService.getDestinationOptions(this.searchForm.value.routes[index].origin);
    if(this.searchForm.value.routes[index].destination){
      this.tripCodeWithIndex.set(index, this.searchForm.value.routes[index].origin.idOrCode + '-' + this.searchForm.value.routes[index].destination.idOrCode);
    }
    // console.log(this.destinatonOptions[index]);
    // if(index>=1 && (<FormArray>this.searchForm.get('routes')).controls[index-1].get('destination').value == null){
    //   const trip = new FormGroup({
    //     origin: new FormControl(null, Validators.required),
    //     destination: new FormControl(this.searchForm.value.routes[index].origin, Validators.required),
    //     date: new FormControl(this.searchForm.value.routes[index-1].date, Validators.required)
    //   });

    //   (<FormArray>this.searchForm.get('routes')).removeAt(index-1);
    //   (<FormArray>this.searchForm.get('routes')).insert(index-1, trip);
    //   this.originOptions[index-1] = this.datadaseHandlerService.getOriginOptions(this.searchForm.value.routes[index-1].destination);
    // }
  }

  setOrigins(e: Event,  index:number) {
    if(this.searchForm.value.routes[index].origin){
      this.tripCodeWithIndex.set(index, this.searchForm.value.routes[index].origin.idOrCode + '-' + this.searchForm.value.routes[index].destination.idOrCode);
    }
    // this.originOptions[index] = this.datadaseHandlerService.getOriginOptions(this.searchForm.value.routes[index].destination);
    // console.log(this.searchForm.value.routes[index].destination);
    // console.log( this.originOptions[index]);
    // if(index<this.tripsCount && (<FormArray>this.searchForm.get('routes')).controls[index+1].get('origin').value == null){
    //   const trip = new FormGroup({
    //     origin: new FormControl(this.searchForm.value.routes[index].destination, Validators.required),
    //     destination: new FormControl(null, Validators.required),
    //     date: new FormControl(this.searchForm.value.routes[index+1].date, Validators.required)
    //   });
    //   (<FormArray>this.searchForm.get('routes')).removeAt(index+1);
    //   (<FormArray>this.searchForm.get('routes')).insert(index+1, trip);
    //   this.destinatonOptions[index+1] = (this.datadaseHandlerService.getDestinationOptions(this.searchForm.value.routes[index+1].origin));
    // }
  }

  // Bu bolumde tarihle ilgili metodlar var. Tarih kisitlamalari musterinin secimi ve secilen guzergahlara ait sefer bilgilerinin databaseden secilmesiyle olusuyor.

  addMaxandMinDates() {
    if(this.minDateArray.length-this.tripsCount > 0) return;
    let minDate = new Date();
    let maxDate = new Date(minDate.getFullYear()+2, 0, 0);
    for(let i=0 ; i<this.minDateArray.length ; i++){
      if (this.minDateArray[i] > minDate) minDate = this.minDateArray[i];
    }
    this.minDateArray.push(minDate);
    this.maxDateArray.push(maxDate);
  }

  datePickerOpened (i: number){
    this.tripDateIndex = i;
  }

  dateEvent(event: MatDatepickerInputEvent<Date>, index: number) {
      for(let i=index+1 ; i<this.maxDateArray.length ; i++ ){
        if (this.minDateArray[i] > event.value){
          continue;
        } else {
          this.minDateArray[i] = event.value;
        }
      }
      for(let i=index-1 ; i>=0 ; i--){
        if (this.maxDateArray[i] < event.value){
          continue;
        } else {
          this.maxDateArray[i] = event.value;
        }
      }
  }

  dateFilter = (d: Date): boolean => {
    console.log(this.tripCodeWithIndex.get(this.tripDateIndex));
    const dates = this.databaseHandlerService.routeFrequencyDictionary.get(this.tripCodeWithIndex.get(this.tripDateIndex));
    for(let sDate of dates){
      const date = new Date(sDate);
      if(d.getUTCFullYear() === date.getUTCFullYear() && d.getUTCMonth() === date.getUTCMonth() && d.getUTCDate() === date.getUTCDate()-1){
        console.log(date.getUTCDate(), ' - ', d.getUTCDate());
        return true;
      }
    }
    return false;
  };

  ngOnDestroy(): void {
    this.customerBookingSub.unsubscribe();
    this.customerBookingSub.unsubscribe();
  }
}
