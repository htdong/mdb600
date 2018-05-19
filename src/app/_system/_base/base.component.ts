import { Component, OnInit,  OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { TranslateService } from '@ngx-translate/core';

// GK - Alphabet
import { GlobalState } from '../../global.state';
import { HelpService } from '../services/help.service';
import { LocalStorageService } from '../services/localStorage.service';
import { MenuService } from '../services/menu.service';
import { NavigationService } from '../services/navigation.service';

/**
 * BASE COMPONENT
 * Provide a minimal structure of standard view that include
 * - {global.state} - Store to manage app state
 * - {help} - Help base on context
 * - {localStorage} - Interacting with local storage
 * - {menu} - Menu base on the context
 * - {navigation} - Track history or not
 */
@Component({
  selector: 'base-component',
  template: `<p>Base Component</p>`
})
export class BaseComponent implements OnInit, OnDestroy {

  myScope = 'base';

  /* Base Properties - To be overridden at inherited components */

  sidebarMenuJSONFile = 'blank.menu.json';

  helpFile = 'blank.mdb'; // Example: blank.mdb.en.html

  globalConfig = {
    language: true,     // Auto monitor change of language
    trackHistory: false
  };

  env;
  cardColors;
  buttonStyle;

  sidebarMenuSubscription: Subscription;

  constructor(
    public translateService: TranslateService,

    public globalState: GlobalState,
    public helpService: HelpService,
    public localStorageService: LocalStorageService,
    public menuService: MenuService,
    public navigationService: NavigationService,
  ) {
    this.env = this.localStorageService.getEnv();
    this.cardColors = this.localStorageService.getCardColors(this.env);
    this.buttonStyle = this.localStorageService.getButtonStyle(this.env);
  }

  ngOnInit() {
    this.subscribeGlobalState();

    this.initSidebarMenu();

    this.initHelpMenu();
  }

  ngOnDestroy() {
    this.unsubscribeGlobalState();
  }

  /* GLOBAL STATE */
  subscribeGlobalState() {
    if (this.globalConfig.language) {
      this.globalState.subscribeEvent('language', this.myScope, (lang) => {
        this.translateService.use(lang);
      });
    }

    if (this.globalConfig.trackHistory) {
      this.navigationService.trackHistory();
    }
  }

  unsubscribeGlobalState() {
    if (this.globalConfig.language) {
      this.globalState.unsubscribeEvent('language', this.myScope);
    }

    if (this.sidebarMenuSubscription) {
      this.sidebarMenuSubscription.unsubscribe();
    }
  }

  /* COMMON FUNCTIONS */
  initSidebarMenu() {
    if (this.sidebarMenuJSONFile.trim()) {
      // console.log(this.sidebarMenuJSONFile);
      this.sidebarMenuSubscription = this.menuService.getMenuFromJSONFile(this.sidebarMenuJSONFile)
          .subscribe(sidebarMenu => {
            // console.log(sidebarMenu);
            this.globalState.notifyMyDataChanged('sidebarMenu', '', sidebarMenu);
          });
    }
  }

  initHelpMenu() {
    this.globalState.notifyMyDataChanged('help', '', this.helpFile);
  }

}
