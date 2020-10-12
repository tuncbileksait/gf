import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { RoutAlternatives } from '../models/booking-model/rout-alternatives';
import { HarbourLocation } from '../models/booking-model/harbour-location';
import { TimeTableRequest } from '../models/requests/search-request';
import { TripsWithDictionary } from '../models/trip-response-model/trips-with-dictionary';
import { RouteFrequencyResponse } from '../models/responses/route-frequency-response';

@Injectable({
  providedIn: 'root',
})
export class DatabaseHandlerService {

  urlEndpoint = 'http://localhost:8080/api/gf';
  routeDictionary: RoutAlternatives [] = [];
  routeFrequencyDictionary: Map<string, string[]> = new Map<string, string[]>();
  origins: HarbourLocation [] = [];
  tripsWithDictionary: TripsWithDictionary [] = [];

  constructor(private http: HttpClient) {}

  setLocations(): Observable<RoutAlternatives[]> {
    const params = new HttpParams().append('type', 'SEA_TRANSPORT');
    return this.http
      .get<RoutAlternatives[]>(this.urlEndpoint + '/all-routes', { params })
      .pipe(
        tap(body =>{
        this.routeDictionary = body;
        this.routeDictionary.forEach(route=>this.origins.push(route.origin));
      }));
  }

  setRouteFrequencyDictionary(){
    this.http.get<RouteFrequencyResponse[]>(this.urlEndpoint + "/all-route-frequencies")
      .subscribe(response=>{
        response.forEach(res=> this.routeFrequencyDictionary.set(res.code, res.suitableDates));
        console.log(this.routeFrequencyDictionary);
      });
  }

  getRouteDictionary() {
    return [...this.routeDictionary];
  }

  getOrigins() {
    return [...this.origins];
  }

  getOriginOptions(location:HarbourLocation): HarbourLocation[] {
    const destinations: HarbourLocation [] = [];
    for(let loc of this.routeDictionary){
      for(let des of loc.destinations){
        if(des.idOrCode === location.idOrCode){
          destinations.push(loc.origin);
        }
      }
    }
    return destinations;
  }

  getDestinationOptions(location:HarbourLocation): HarbourLocation[]{
    for(let loc of this.routeDictionary){
      if (loc.origin.idOrCode === location.idOrCode){
        return loc.destinations;
      }
    }
    return [];
  }

    // In this method, timer simulates database connection time.
    postSearchRequest(request: TimeTableRequest): Observable<TripsWithDictionary> {
      return this.http.post<TripsWithDictionary>(this.urlEndpoint + '/trips', request, {observe: 'body'})
      .pipe(tap(response=>{
        this.tripsWithDictionary.push(response);
      }))
    }
}
