import { Component, OnInit, OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../../global.state';
import { HelpService } from '../../../_system/services/help.service';
import { LocalStorageService } from '../../../_system/services/localStorage.service';
import { NavigationService } from '../../../_system/services/navigation.service';
import { MenuService } from '../../../_system/services/menu.service';

import { BaseComponent } from '../../../_system/_base/base.component';

@Component({
  templateUrl: 'user00.html',
  styleUrls: [ 'user00.scss' ]
})
export class User00Component extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'user00';

  // Override Base class properties

  sidebarMenuJSONFile = 'home.menu.mdb.json';

  helpFile = 'blank';

  globalConfig = {
    language: true,
    trackHistory: true
  };

  tcodes = [];

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public helpService: HelpService,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, helpService, localStorageService, menuService, navigationService);

    // Derive class constructor
  }

  ngOnInit() {
    /* Base class initialization */
    super.ngOnInit();

    /* Derive class initialization */
    this.initTcodes();
  }

  ngOnDestroy() {
    /* Base class destroy */
    super.ngOnDestroy();
  }

  initTcodes() {
    const orgImagePath = 'org/';
    this.tcodes = [
      {
        tcode:  'request01',
        title:  'Request 01',
        url:    '/request01',
        img: orgImagePath + 'circle/x1.svg',
        squareImg: orgImagePath + 'square/x1.svg',
      },
      {
        tcode:  'request02',
        title:  'Request 02',
        url:    '/request02',
        img: orgImagePath + 'circle/x1.svg',
        squareImg: orgImagePath + 'square/x1.svg',
      },
      {
        tcode:  'request03',
        title:  'Request 03',
        url:    '/request03',
        img: orgImagePath + 'circle/x1.svg',
        squareImg: orgImagePath + 'square/x1.svg',
      },
      {
        tcode:  'request04',
        title:  'Request 04',
        url:    '/request04',
        img: orgImagePath + 'circle/x1.svg',
        squareImg: orgImagePath + 'square/x1.svg',
      },
      {
        tcode:  'request05',
        title:  'Request 05',
        url:    '/request05',
        img: orgImagePath + 'circle/x1.svg',
        squareImg: orgImagePath + 'square/x1.svg',
      }
    ];
  }

  gotoTcode(tcode) {
    alert(tcode);
  }
}
