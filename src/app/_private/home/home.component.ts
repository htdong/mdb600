import { Component, OnInit, OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../global.state';
import { HelpService } from '../../_system/services/help.service';
import { LocalStorageService } from '../../_system/services/localStorage.service';
import { NavigationService } from '../../_system/services/navigation.service';
import { MenuService } from '../../_system/services/menu.service';

import { BaseComponent } from '../../_system/_base/base.component';

import { CarService } from './carservice';

import { SelectItem } from 'primeng/api';

export interface Car {
  vin?;
  year?;
  brand?;
  color?;
  price?;
  saleDate?;
}

@Component({
  templateUrl: 'home.html',
  styleUrls: [ 'home.scss' ]
})
export class HomeComponent extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'home';

  // Override Base class properties

  sidebarMenuJSONFile = 'home.menu.mdb.json';

  helpFile = 'home';

  globalConfig = {
    language: true,
    trackHistory: true
  };

  cars: Car[];
    
    selectedCar: Car;
    
    displayDialog: boolean;

    sortOptions: SelectItem[];

    sortKey: string;

    sortField: string;

    sortOrder: number;

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public helpService: HelpService,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services
    private carService: CarService
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, helpService, localStorageService, menuService, navigationService);

    // Derive class constructor
  }

  ngOnInit() {
    /* Base class initialization */
    super.ngOnInit();

    /* Derive class initialization */
    this.carService.getCarsLarge().then(cars => this.cars = cars);

    this.sortOptions = [
        {label: 'Newest First', value: '!year'},
        {label: 'Oldest First', value: 'year'},
        {label: 'Brand', value: 'brand'}
    ];

  }

  ngOnDestroy() {
    /* Base class destroy */
    super.ngOnDestroy();
  }

  /**
   *  [COMPONENT FUNCTIONS]
   */

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

  selectCar(event: Event, car: Car) {
    this.selectedCar = car;
    this.displayDialog = true;
    event.preventDefault();
  }

  onSortChange(event) {
      let value = event.value;

      if (value.indexOf('!') === 0) {
          this.sortOrder = -1;
          this.sortField = value.substring(1, value.length);
      }
      else {
          this.sortOrder = 1;
          this.sortField = value;
      }
  }

  onDialogHide() {
      this.selectedCar = null;
  }

}
