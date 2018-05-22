import { Component, OnInit } from '@angular/core';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';

import { LocalStorageService } from './_system/services/localStorage.service';

@Component({
  selector: 'mdb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private mdbSpinningPreloader: MDBSpinningPreloader,
  ) { }

  ngOnInit() {
    this.mdbSpinningPreloader.stop();
  }

}
