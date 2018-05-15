import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../../app.config';
import { HttpClientService } from '../../_system/services/httpClient.service';
import { SecurityService } from '../../_system/services/security.service';
import { RequestComment } from './requestComments.models';

@Injectable()
export class RequestCommentsServices {

  suffixUrl = '/requestComments/';

  constructor(
    private appConfig: AppConfig,
    private httpClientService: HttpClientService,
    private securityService: SecurityService,
  ) { }

  resetRequestComments() {
    return Promise.resolve([]);
  }

  action11(id, comment) {
    console.log(id, comment);

    const reqOptions = {
      id: id,
      comment: comment,
      disableToast: true
    };

    return this.httpClientService.post(this.suffixUrl + 'entry', reqOptions)
      .map((res) => {
        // console.log(res);
        return res.body.data || {};
      });
  }

  action1x(_id, first: number, rows: number) {
    const pagination = {
      first: first,
      rows: rows
    };

    const reqOptions = {
      params: pagination,
      disableToast: true
    };

    return this.httpClientService.get(this.suffixUrl + 'list/' + _id, reqOptions)
      .map((res) => {
        // console.log(res);
        return res.body.data || {};
      });
  }

}
