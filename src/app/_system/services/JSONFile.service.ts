import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
* @module JSONFileService
* Service to load JSON data from file
*/
@Injectable({
  providedIn: 'root'
})
export class JSONFileService {

  private json = new Subject<any>();

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
  * @function getJSON
  * Return the current menu as observable stream
  */
  getJSON(): Observable<any> {
    return this.json.asObservable();
  }

  /**
  * @function getJSONData
  * Get JSON data from file
  *
  * @param {string} jsonFile
  *
  * @return {Promise}
  */
  getJSONData(jsonFile): Observable<any> {
    const file = 'assets/' + jsonFile;

    return this.httpClient.get(file)
      .map((res: any) => {
        // console.log(res);

        return res;
      })
      .catch((error: any) => {
        console.log(error);
        return Promise.resolve(error);
      });
  }

}
