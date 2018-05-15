import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../global.state';
import { LocalStorageService } from '../../_system/services/localStorage.service';
import { NavigationService } from '../../_system/services/navigation.service';
import { MenuService } from '../../_system/services/menu.service';

import { BaseComponent } from '../../_system/_base/base.component';

import { AppDoubleNavLayoutComponent } from '../../_system/_layouts/doubleNavsLayout.component';

import { TimezonesService } from '../../_system/_static/timezones.service';
import { CompleterService } from 'ng-mdb-pro/pro';
import { CompleterData } from 'ng-mdb-pro/pro/autocomplete';

@Component({
  templateUrl: 'setting.html',
  styleUrls: [ 'setting.scss' ]
})
export class SettingComponent extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'setting';

  // Override Base class properties
  pageTitle = 'setting';

  sidebarMenuJSONFile = 'home.menu.mdb.json';

  globalConfig = {
    language: true,
    trackHistory: true
  };

  helpFile = 'home';

  // Derive class properties
  public form: FormGroup;

  styleList = [
    { label: 'Modern', value: true },
    { label: 'Classic', value: false }
  ];

  cardColors: any;
  buttonStyle: any;

  settings: any;

  localeList: any[];
  protected dataService: CompleterData;

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services
    public app: AppDoubleNavLayoutComponent,
    private completerService: CompleterService,
    private fb: FormBuilder,
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, menuService, navigationService);

    // Derive class constructor
    this.localeList = TimezonesService.data.map((d, i) => {
      return {
        label: d.text,
        value: d.abbr
      }
    });

    this.dataService = completerService.local(this.localeList, 'label', 'label');

    const env = this.localStorageService.getEnv();
    this.cardColors = this.localStorageService.getCardColors(env);
    this.buttonStyle = this.localStorageService.getButtonStyle(env);
    this.settings = this.localStorageService.getSettings(env);

    this.form = fb.group({
      'style': [this.settings.style, Validators.compose([Validators.required])],
      'locale': [this.settings.locale, Validators.compose([Validators.required])],
      'locale_value': [this.settings.locale_value, Validators.compose([Validators.required])]
    });
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
  }

  ngOnDestroy() {
    /* Base class destroy */
    super.ngOnDestroy();

    // const element = document.getElementsByTagName('body')[0];
    // element.classList.remove('landing-body');
  }

  /**
   *  [COMPONENT FUNCTIONS]
   */

   onAddTag(selectedObject: any) {
     if (selectedObject) {
       console.log(selectedObject.originalObject);
       this.form.patchValue({locale_value: selectedObject.originalObject.value})
     }
   }

  save() {
    console.log(this.form.value);
    if (this.form.valid) {
      this.localStorageService.setSettings(this.form.value);
      this.showSuccess();
    }
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