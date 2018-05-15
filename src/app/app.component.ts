// import { LocalStorageService } from './../../../mdb-template/src/app/_system/services/localStorage.service';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { MDBSpinningPreloader } from 'ng-mdb-pro';

import { LocalStorageService } from './_system/services/localStorage.service';

@Component({
  selector: 'mdb-root',
  // app-root
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    private translate: TranslateService,
    private localStorageService: LocalStorageService,
    private mdbSpinningPreloader: MDBSpinningPreloader,
  ) { 
    translate.addLangs(['en', 'vn', 'jp', 'kr', 'ch', 'fr']);
    translate.setDefaultLang('en');

    translate.use(localStorageService.getLang());

    const browserLang = translate.getBrowserLang();
  }

  ngOnInit() {
    this.mdbSpinningPreloader.stop();
  }
}
