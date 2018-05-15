import { Component, OnInit, OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../global.state';
import { LocalStorageService } from '../../_system/services/localStorage.service';
import { NavigationService } from '../../_system/services/navigation.service';
import { MenuService } from '../../_system/services/menu.service';

import { BaseComponent } from '../../_system/_base/base.component';

@Component({
  templateUrl: 'about.html',
  styleUrls: [ 'about.scss' ]
})
export class AboutComponent extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'about';

  // Override Base class properties
  pageTitle = 'about';

  sidebarMenuJSONFile = 'home.menu.mdb.json';

  globalConfig = {
    language: true,
    trackHistory: true
  };

  helpFile = 'home';

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, menuService, navigationService);

    // Derive class constructor
  }

  ngOnInit() {
    /* Base class initialization */
    super.ngOnInit();
    this.subscribeGlobalState();

    /* Derive class initialization */

    // Initialize sidebar menu
    this.initSidebarMenu();

    // Initialize help modal content
    this.globalState.notifyMyDataChanged('help', '', this.helpFile);


    // const element = document.getElementsByTagName('body')[0];
    // element.classList.add('landing-body');
  }

  ngOnDestroy() {
    /* Base class destroy */
    super.ngOnDestroy();

    // const element = document.getElementsByTagName('body')[0];
    // element.classList.remove('landing-body');
  }

  /**
   *  [COMPONENT FUNCTIONS]
   * @function changeLanguage
   */

  public changeLanguage(lang: string) {
    this.localStorageService.setLang(lang);
    this.translateService.use(lang);
  }

  showSuccess() {
    const data = {
      type: 'success',
      message: 'Messages',
      title: 'Info'
    };

    this.globalState.notifyMyDataChanged('toast', '', data);
  }

  showError() {
    const data = {
      type: 'error',
      message: 'Messages',
      title: 'Info'
    };

    this.globalState.notifyMyDataChanged('toast', '', data);
  }

}
