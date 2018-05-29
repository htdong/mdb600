import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TranslateService } from '@ngx-translate/core';

import { Store, select } from '@ngrx/store';
import {
  getTopNotificationsAction,

  getNotificationsAction,
  markNotificationAction,
  unmarkNotificationAction,
  deleteNotificationAction,
  getNotificationAction
} from '../../ngrx/notification/notifications.actions';

import { TruncatePipe } from '../../_system/pipes/truncate.pipe';

import { GlobalState } from '../../global.state';
import { HelpService } from '../../_system/services/help.service';
import { LocalStorageService } from '../../_system/services/localStorage.service';
import { NavigationService } from '../../_system/services/navigation.service';
import { MenuService } from '../../_system/services/menu.service';

import { BaseComponent } from '../../_system/_base/base.component';

@Component({
  templateUrl: 'notifications.html',
  styleUrls: [ 'notifications.scss' ]
})
export class NotificationsComponent extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'notifications';

  // Override Base class properties

  sidebarMenuJSONFile = 'home.menu.mdb.json';

  helpFile = 'blank';

  globalConfig = {
    language: true,
    trackHistory: true
  };

  notifications: Observable<any>;
  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public helpService: HelpService,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services
    private store: Store<any>
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, helpService, localStorageService, menuService, navigationService);

    // Derive class constructor
    this.notifications = this.store.pipe(select('notifications'));
    this.notifications.subscribe(res => {
      console.log(res);
      // this.store.dispatch(getTopNotificationsAction('', '{"created_at": -1}', 0, 5));
    });

    const firstPagination = {
      filter: '',
      sort: '{"created_at": -1}',
      first: 0,
      rows: 10
    };

    this.requestPaginatedData(firstPagination);

    // this.store.dispatch(getNotificationsAction('', '{"created_at": -1}', 0, 5));
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

  /* COMPONENT OPERATION */
  doPageChange(event) {
    console.log(event);

    this.requestPaginatedData(event);
    // this.store.dispatch(getNotificationsAction(
    //   event.pagination.filter,
    //   event.pagination.sort,
    //   event.pagination.first,
    //   event.pagination.rows
    // ));

    // switch (event.action) {
    //   case 'query':
    //
    //     break;
    //
    //   case 'mark':
    //     this.store.dispatch(markNotificationAction(event.id));
    //     break;
    //
    //   case 'unmark':
    //     this.store.dispatch(unmarkNotificationAction(event.id));
    //     break;
    //
    //   case 'delete':
    //     this.store.dispatch(deleteNotificationAction(event.id));
    //     break;
    // }

  }

  requestPaginatedData(pagination) {
    this.store.dispatch(getNotificationsAction(
      pagination['filter'] || '',
      pagination['sort'] || '{}',
      pagination.first,
      pagination.rows
    ));
  }

}
