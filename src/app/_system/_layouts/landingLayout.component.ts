import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-landing-layout',
  templateUrl: './landingLayout.component.html',
})
export class AppLandingLayoutComponent implements OnInit, OnDestroy {

  myScope = 'app-landing-layout';

  constructor() {}

  ngOnInit(): void {
    this.subscribeLocalState();
  }

  ngOnDestroy() {
    this.unsubscribeLocalState();
  }

  /* LOCAL STATE */
  subscribeLocalState() {}

  unsubscribeLocalState() {}

}
