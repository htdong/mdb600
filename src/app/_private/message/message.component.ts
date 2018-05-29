import { Component, OnInit, OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../global.state';
import { HelpService } from '../../_system/services/help.service';
import { LocalStorageService } from '../../_system/services/localStorage.service';
import { NavigationService } from '../../_system/services/navigation.service';
import { MenuService } from '../../_system/services/menu.service';

import { BaseComponent } from '../../_system/_base/base.component';

@Component({
  templateUrl: 'message.html',
  styleUrls: [ 'message.scss' ]
})
export class MessageComponent extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'message';

  // Override Base class properties

  sidebarMenuJSONFile = 'home.menu.mdb.json';

  helpFile = 'blank';

  globalConfig = {
    language: true,
    trackHistory: true
  };

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
  }

  ngOnDestroy() {
    /* Base class destroy */
    super.ngOnDestroy();
  }

}
