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

export interface Tcode {
  tcode?;
  title;
  url?;
  img;
  squareImg;
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

  requests: Tcode[];

  tasks: Tcode[];

  mData: Tcode[];

  settings: Tcode[];


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

    this.initRequests();

    this.initTasks();

    this.initMasterData();

    this.initSettings();
  }

  ngOnDestroy() {
    /* Base class destroy */
    super.ngOnDestroy();
  }

  /**
   *  [COMPONENT FUNCTIONS]
   */

  // showSuccess() {
  //   const data = {
  //     type: 'success',
  //     message: 'Messages',
  //     title: 'Info'
  //   };

  //   this.globalState.notifyMyDataChanged('toast', '', data);
  // }

  // showError() {
  //   const data = {
  //     type: 'error',
  //     message: 'Messages',
  //     title: 'Info'
  //   };

  //   this.globalState.notifyMyDataChanged('toast', '', data);
  // }

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
      } else {
          this.sortOrder = 1;
          this.sortField = value;
      }
  }

  onDialogHide() {
      this.selectedCar = null;
  }

  gotoTcode(tcode) {
    alert(tcode);
  }

  initRequests() {
    const orgImagePath = 'org/';
    this.requests = [
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

  initTasks() {
    const orgImagePath = 'org/';
    this.tasks = [
      {
        tcode:  'task01',
        title:  'task 01',
        url:    '/task01',
        img: orgImagePath + 'circle/x1.svg',
        squareImg: orgImagePath + 'square/x1.svg',
      },
      {
        tcode:  'task02',
        title:  'task 02',
        url:    '/task02',
        img: orgImagePath + 'circle/x1.svg',
        squareImg: orgImagePath + 'square/x1.svg',
      },
      {
        tcode:  'task03',
        title:  'task 03',
        url:    '/task03',
        img: orgImagePath + 'circle/x1.svg',
        squareImg: orgImagePath + 'square/x1.svg',
      },
      {
        tcode:  'task04',
        title:  'task 04',
        url:    '/task04',
        img: orgImagePath + 'circle/x1.svg',
        squareImg: orgImagePath + 'square/x1.svg',
      },
      {
        tcode:  'task05',
        title:  'task 05',
        url:    '/task05',
        img: orgImagePath + 'circle/x1.svg',
        squareImg: orgImagePath + 'square/x1.svg',
      }
    ];
  }

  initMasterData() {
    const orgImagePath = 'org/';
    this.mData = [
      {
        tcode:  'mdata01',
        title:  'mdata 01',
        url:    '/mdata01',
        img: orgImagePath + 'circle/x1.svg',
        squareImg: orgImagePath + 'square/x1.svg',
      },
      {
        tcode:  'mdata02',
        title:  'mdata 02',
        url:    '/mdata02',
        img: orgImagePath + 'circle/x1.svg',
        squareImg: orgImagePath + 'square/x1.svg',
      },
      {
        tcode:  'mdata03',
        title:  'mdata 03',
        url:    '/mdata03',
        img: orgImagePath + 'circle/x1.svg',
        squareImg: orgImagePath + 'square/x1.svg',
      },
      {
        tcode:  'mdata04',
        title:  'mdata 04',
        url:    '/mdata04',
        img: orgImagePath + 'circle/x1.svg',
        squareImg: orgImagePath + 'square/x1.svg',
      },
      {
        tcode:  'mdata05',
        title:  'mdata 05',
        url:    '/mdata05',
        img: orgImagePath + 'circle/x1.svg',
        squareImg: orgImagePath + 'square/x1.svg',
      }
    ];
  }

  initSettings() {
    const orgImagePath = 'org/';
    this.settings = [
      {
        tcode:  'setting01',
        title:  'setting 01',
        url:    '/setting01',
        img: orgImagePath + 'circle/x1.svg',
        squareImg: orgImagePath + 'square/x1.svg',
      },
      {
        tcode:  'setting02',
        title:  'setting 02',
        url:    '/setting02',
        img: orgImagePath + 'circle/x1.svg',
        squareImg: orgImagePath + 'square/x1.svg',
      },
      {
        tcode:  'setting03',
        title:  'setting 03',
        url:    '/setting03',
        img: orgImagePath + 'circle/x1.svg',
        squareImg: orgImagePath + 'square/x1.svg',
      },
      {
        tcode:  'setting04',
        title:  'setting 04',
        url:    '/setting04',
        img: orgImagePath + 'circle/x1.svg',
        squareImg: orgImagePath + 'square/x1.svg',
      },
      {
        tcode:  'setting05',
        title:  'setting 05',
        url:    '/setting05',
        img: orgImagePath + 'circle/x1.svg',
        squareImg: orgImagePath + 'square/x1.svg',
      }
    ];
  }

}
