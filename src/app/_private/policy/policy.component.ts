import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

import { Observable } from 'rxjs/Observable';

import { GlobalState } from '../../global.state';
import { HelpService } from '../../_system/services/help.service';
import { LocalStorageService } from '../../_system/services/localStorage.service';
import { NavigationService } from '../../_system/services/navigation.service';
import { MenuService } from '../../_system/services/menu.service';

import { BaseComponent } from '../../_system/_base/base.component';

@Component({
  templateUrl: 'policy.html',
  styleUrls: [ 'policy.scss' ]
})
export class PolicyComponent extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'policy';

  // Override Base class properties

  sidebarMenuJSONFile = 'home.menu.mdb.json';

  helpFile = 'home';

  globalConfig = {
    language: false,
    trackHistory: true
  };

  cardColors;

  license: String;
  thirdPartiesLicenses: String;

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public helpService: HelpService,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services
    private httpClient: HttpClient,
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, helpService, localStorageService, menuService, navigationService);

    // Derive class constructor
    const env = this.localStorageService.getEnv();
    this.cardColors = this.localStorageService.getCardColors(env);

    // Agreements
    this.refreshAgreementFile();

    const licensesfile = 'assets/licenses/all.html';
    this.getAgreementFile(licensesfile)
      .subscribe((licenses) => {
        this.thirdPartiesLicenses = licenses;
        console.log(licenses);
      });

  }

  ngOnInit() {
    /* Base class initialization */
    super.ngOnInit();

    /* Derive class initialization */
    this.subscribeLocalState();
  }

  ngOnDestroy() {
    /* Base class destroy */
    super.ngOnDestroy();

    /* Derive class initialization */
    this.unsubscribeLocalState();
  }

  /* LOCAL STATE */
  subscribeLocalState() {
    // Language
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      this.translateService.use(lang);

      this.refreshAgreementFile();

    });
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
  }

  /* COMPONENT FUNCTIONS */

  getAgreementFile(file): Observable<any> {
    return this.httpClient.get(file, { responseType: 'text' })
      .map((res) => {
        return res;
      })
      .catch((error) => {
        console.log(error);
        return Promise.resolve(error);
      });
  }

  refreshAgreementFile() {
    const lang = this.localStorageService.getLang();
    const lang1 = lang=='vn' ? lang : 'en';

    const file = 'assets/licenses/license.' + lang1 + '.html';

    this.getAgreementFile(file)
      .subscribe((license) => {
        this.license = license;
        console.log(license);
      });
  }
}
