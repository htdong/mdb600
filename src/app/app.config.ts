import { Injectable } from '@angular/core';

/**
* @module AppConfig
* Class store all common and shared information
*/
@Injectable({
  providedIn: 'root',
})
export class AppConfig {
    // web server url address
    public readonly apiUrl = 'http://localhost:4000';
}
