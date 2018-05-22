import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Car {
    vin?;
    year?;
    brand?;
    color?;
    price?;
    saleDate?;
  }

@Injectable({
  providedIn: 'root'
})
export class CarService {

    constructor(private http: HttpClient) { }

    getCarsSmall() {
    return this.http.get<any>('assets/data/cars-small.json')
      .toPromise()
      .then(res => <Car[]>res.data)
      .then(data => { return data; });
    }

    getCarsMedium() {
    return this.http.get<any>('assets/data/cars-medium.json')
      .toPromise()
      .then(res => <Car[]>res.data)
      .then(data => { return data; });
    }

    getCarsLarge() {
    return this.http.get<any>('assets/data/cars-large.json')
      .toPromise()
      .then(res => <Car[]>res.data)
      .then(data => { return data; });
    }

  getCarsHuge() {
    return this.http.get<any>('assets/data/cars-huge.json')
      .toPromise()
      .then(res => <Car[]>res.data)
      .then(data => { return data; });
  }
}