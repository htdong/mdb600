import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { LocalStorageService } from '../../_system/services/localStorage.service';
import { TcodeService } from '../../_system/services/tcode.service';

/**
* @module P500Component
* Page 500
*
* @function keyDownFunction
* @function executeTcode
* @function gotoPage
*/

@Component({
  templateUrl: '500.html',
  styleUrls: [
    '500.scss',
  ]
})
export class P500Component implements OnInit, OnDestroy {

  public tcodeExecution = '';

  constructor(
    private router: Router,
    private translateService: TranslateService,

    private localStorageService: LocalStorageService,
    private tcodeService: TcodeService,
  ) {
    // Initialize language
    translateService.use(localStorageService.getLang());
  }

  ngOnInit() {}

  ngOnDestroy() {}

  /**
  * @function keyDownFunction
  * Check if user input equals enter
  *
  * @param event
  */
  public keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.executeTcode();
    }
  }

  /**
  * @function executeTcode
  * Execute a Tcode
  */
  public executeTcode() {
    const url: string = this.tcodeService.urlLead(this.tcodeExecution);
    this.tcodeExecution = '';
    this.router.navigate([url]);
  }

  /**
  * @function gotoPage
  * Goto a page
  */
  gotoPage(page) {
    this.tcodeService.executeTcode(page);
  }

}
