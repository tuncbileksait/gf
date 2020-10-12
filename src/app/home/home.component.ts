import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatabaseHandlerService } from '../shared/services/database-handler.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  // constructor(private datadaseHandlerService: DatabaseHandlerService) {}

  // @ViewChild('f') customerFirstForm: NgForm;

  // originTrip1: string;
  // destinatonTrip1: string;
  // originOptionsTrip1: string[] = [];
  // destinatonOptionsTrip1: string[] = [];
  // // allDestinatonOptions: Map<string, string[]> = new Map();
  // allOriginOptions: Map<string, string[]> = new Map();
  // voyageCount: number = 0;
  // passengerCount: number = 0;
  // passengerCountArray: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // vehicleCount: number = 0;
  // vehicleCountArray: number[] = [0, 1, 2, 3, 4, 5];

  // originTrip2: string;
  // destinatonTrip2: string;
  // originOptionsTrip2: string[] = [];
  // destinatonOptionsTrip2: string[] = [];

  // originTrip3: string;
  // destinatonTrip3: string;
  // originOptionsTrip3: string[] = [];
  // destinatonOptionsTrip3: string[] = [];


  // dateFilter = (d: Date | null): boolean => {
  //     const day = (d || new Date()).getDay();
  //     // Prevent Saturday and Sunday from being selected.
  //     return day !== 0 && day !== 6;
  // };

  // ngOnInit() {
  //     this.originOptionsTrip1 = this.datadaseHandlerService.getOriginOptions();
  //     this.destinatonOptionsTrip1 = this.datadaseHandlerService.getOriginOptions();
  //     this.originOptionsTrip2 = this.datadaseHandlerService.getOriginOptions();
  //     this.destinatonOptionsTrip2 = this.datadaseHandlerService.getOriginOptions();
  //     this.originOptionsTrip3 = this.datadaseHandlerService.getOriginOptions();
  //     this.destinatonOptionsTrip3 = this.datadaseHandlerService.getOriginOptions();
  //     this.allOriginOptions = this.datadaseHandlerService.getOptionsByLocation();
  // }

  // setDestinationsTrip1(e: Event) {
  //     this.destinatonOptionsTrip1 = this.allOriginOptions.get(this.originTrip1);
  // }

  // setOriginsTrip1(e: Event) {
  //     this.originOptionsTrip1 = this.allOriginOptions.get(this.destinatonTrip1);
  //     this.originTrip2 = this.destinatonTrip1;
  //     this.destinatonOptionsTrip2 = this.allOriginOptions.get(this.originTrip2);
  // }

  // setDestinationsTrip2(e: Event) {
  //     this.destinatonOptionsTrip2 = this.allOriginOptions.get(this.originTrip2);
  // }

  // setOriginsTrip2(e: Event) {
  //     this.originOptionsTrip2 = this.allOriginOptions.get(this.destinatonTrip2);
  //     this.originTrip3 = this.destinatonTrip2;
  //     this.destinatonOptionsTrip3 = this.allOriginOptions.get(this.originTrip3);
  // }

  // setDestinationsTrip3(e: Event) {
  //     this.destinatonOptionsTrip3 = this.allOriginOptions.get(this.originTrip3);
  // }

  // setOriginsTrip3(e: Event) {
  //     this.originOptionsTrip3 = this.allOriginOptions.get(this.destinatonTrip3);
  // }

  // getMultiRoutCount() {
  //     const count = this.voyageCount > 1 ? this.voyageCount : 1;
  //     return new Array(count);
  // }

  // onSubmit(){
  //     console.log(this.customerFirstForm);
  // }

  // changeRouteCount (number: number){
  //     this.voyageCount+=number;
  //     this.voyageCount = this.voyageCount===1 ? 0 : this.voyageCount;
  // }

}
