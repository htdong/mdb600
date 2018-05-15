import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { LocalStorageService } from '../../../../_system/services/localStorage.service';
import { TcodeService } from '../../../../_system/services/tcode.service';

/**
* @module PostsComponent
* Page 401
*
* @function keyDownFunction
* @function executeTcode
* @function gotoPage
*/

@Component({
  templateUrl: 'posts.html',
  styleUrls: [ 'posts.scss' ]
})
export class PostsComponent implements OnInit, OnDestroy {

  bodySkin = 'grey-skin';

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

  ngOnInit() {
    const element = document.getElementsByTagName('body')[0];
    element.className = this.bodySkin;
  }

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
