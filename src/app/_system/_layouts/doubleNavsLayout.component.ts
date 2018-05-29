import { Component, OnInit, OnDestroy, AfterViewInit, Renderer2, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/filter';

import { ToastService } from 'ng-uikit-pro-standard';

import { TranslateService } from '@ngx-translate/core';

import { Store, select } from '@ngrx/store';
import { getTopNotificationsAction } from '../../ngrx/notification/notifications.actions';

// GK - Alphabet
import { AppConfig } from '../../app.config';
import { GlobalState } from '../../global.state';
import { HelpService } from '../services/help.service';
import { JSONFileService } from '../services/JSONFile.service';
import { LocalStorageService } from '../services/localStorage.service';
import { NavigationService } from '../services/navigation.service';
import { SecurityService } from '../services/security.service';
import { TcodeService } from '../services/tcode.service';

import { routerTransition } from './router.animations';

@Component({
  selector: 'app-double-navs-layout',
  animations: [ routerTransition ],
  templateUrl: './doubleNavsLayout.component.html',
  styleUrls: ['./layout.scss'],
})
export class AppDoubleNavLayoutComponent implements OnInit, OnDestroy, AfterViewInit {

  myScope = 'app-double-navs-layout';

  /**
   * DOUBLE NAVIGATION
   *
   * <body class="{{bodySkin}}" [ngClass]="{'fixed-sn': isFixed, 'hidden-sn': !isFixed}">
   * <mdb-sidenav #sidenav class="{{sideNavBg}}" [ngClass]="{'fixed': isFixed}" [fixed]="isFixed">
   *
   * Static:  isFixed === true
   * Overlay: isFixed === false
   *
   */

  bodySkin = 'mdb-skin';
  sideNavBg = 'sn-bg-2';
  isFixed = true;

  effects = [
    // 'bounceIn',
    'bounceInDown',
    'bounceInLeft',
    'bounceInRight',
    'bounceInUp',
    // 'fadeIn',
    'fadeInDown',
    'fadeInLeft',
    'fadeInRight',
    'fadeInUp',
    // 'flip',
    'flipInX',
    'flipInY',
    'slideInDown',
    'slideInLeft',
    'slideInRight',
    'slideInUp',
    'zoomIn'
  ];

  effectsOut = [
    'fadeOut',
    'fadeOutDown',
    'fadeOutLeft',
    'fadeOutRight',
    'fadeOutUp'
  ];
  selectedEffect;
  applyEffect;

  @ViewChild('sidenav') public sidenav;

  name;
  email;
  avatar;

  enableTcode = true;
  public form: FormGroup;
  public tcodeExecution = '';

  menu = [];
  selectedMenu: any;

  breadcrumbs: Array<Object>;

  notification: any;
  notificationCount = 0;
  notificationsList = [];

  message: any;
  messageCount = 0;
  messagesList = [];

  lang;

  tcodeBarStatus = true;
  prefixList: any[];
  actionList: any[];
  selectedPrefix: any;
  selectedAction: any;

  wkBarStatus = true;
  lges: any[];
  years: any[];
  selectedLge: any;
  selectedYear: any;

  helpFile: String = 'blank';
  helpContext: String;

  toasty: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,

    private toastrService: ToastService,

    private translateService: TranslateService,

    // GK - Alphabet
    private appConfig: AppConfig,
    private globalState: GlobalState,
    private helpService: HelpService,
    private jsonFileService: JSONFileService,
    private localStorageService: LocalStorageService,
    private navigationService: NavigationService,
    private securityService: SecurityService,
    private tcodeService: TcodeService,
    private cd: ChangeDetectorRef,

    private store: Store<any>,
  ) {
    this.subscribeLocalState();

    this.selectedEffect = Math.floor(Math.random() * 15);
    this.applyEffect = this.effects[this.selectedEffect];
    // console.log(this.applyEffect);

    // USER APP STATE
    const env = this.localStorageService.getEnv();
    // console.log(env);

    this.lang = env.pref.lang;
    this.wkBarStatus = env.wk.status;
    this.selectedYear = env.wk.year;
    this.selectedLge = env.wk.lge;
    this.toasty = env['pref']['toasty'];
    // console.log(this.toasty);

    // LANGUAGE
    this.globalState.notifyMyDataChanged('language', '', this.lang);

    // SAMPLE TCODE DATA
    this.jsonFileService.getJSONData('data/prefix.list.json')
      .subscribe(res => {
        this.prefixList = res;
      });

    this.jsonFileService.getJSONData('data/action.list.json')
      .subscribe(res => {
        this.actionList = res;
      });

    // SAMPLE WORKING DATA
    const thisYear = new Date().getFullYear();

    this.lges = [];
    this.lges.push({label: 'Sanofi Aventis', value: '0475' });
    this.lges.push({label: 'Sanofi Synthelabor', value: '4247' });
    this.lges.push({label: 'Sanofi Vietnam', value: '1028' });

    // TODO: To check if year N-1 exist for such client or not based on the day of service start
    this.years = [];
    this.years.push({label: 'Year ' + thisYear, value: thisYear.toString() });
    this.years.push({label: 'Year ' + (thisYear - 1), value: (thisYear - 1).toString() });

    // NOTIFICATIONS
    this.notification = this.store.pipe(select('top_notifications'));

    this.notification.subscribe(res => {
      this.notificationCount = res.data.total || 0;
      this.notificationsList = res.data.data || [];
    });
    this.store.dispatch(getTopNotificationsAction('', '{"created_at": -1}', 0, 5));

    // Router processing
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event) => {
      this.breadcrumbs = [];
      let currentRoute = this.route.root,
      url = '';
      do {
        const childrenRoutes = currentRoute.children;
        currentRoute = null;
        // tslint:disable-next-line:no-shadowed-variable
        childrenRoutes.forEach(route => {
          if (route.outlet === 'primary') {
            const routeSnapshot = route.snapshot;
            url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
            this.breadcrumbs.push({
              label: route.snapshot.data,
              url:   url
            });
            currentRoute = route;
          }
        });
      } while (currentRoute);
    });
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  ngOnInit() {
    // const el = document.getElementById('gkOutlet');
    // el.classList.add(this.effects[this.selectedEffect]);

    const element = document.getElementsByTagName('body')[0];
    element.className = this.bodySkin;

    // Initialize Title
    const title = this.breadcrumbs[this.breadcrumbs.length - 1]['label']['title'];
    this.translateService.get([title])
      .subscribe((res) => {
        this.titleService.setTitle(res[title]);
        // console.log(this.breadcrumbs);
      });

    const user = this.securityService.getCurrentUser();
    this.email = user.email;

    if (user.name) {
      this.name = user.name;
    } else {
      const parts = user['email'].split('@');
      this.name = parts[0];
    }

    if (user.avatar) {
      const rootPath = this.appConfig.apiUrl;
      this.avatar = rootPath + '/repo/' + this.securityService.getToken() + '/users/' + user.avatar;
    } else {
      this.avatar = user.gravatar;
    }
  }

  ngOnDestroy() {
    // this.selectedEffect = Math.floor(Math.random() * 17);
    // this.applyEffect = this.effectsOut[this.selectedEffect];
    this.unsubscribeLocalState();
  }

  /* LOCAL STATE */
  subscribeLocalState() {

    // Sidebar Menu
    this.globalState.subscribeEvent('sidebarMenu', this.myScope, (menu) => {
      this.menu = menu;
      // console.log(menu);
    });

    // Help Modal
    this.globalState.subscribeEvent('help', this.myScope, (helpFile) => {
      this.helpFile = helpFile;
      this.helpService.getHelpFromHTMLFile(helpFile)
        .subscribe((helpContext) => {
          this.helpContext = helpContext;
          // console.log(helpContext);
        });
    });

    // Language
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      this.lang = lang;
      // console.log(this.lang);

      this.translateService.use(this.lang);
      this.localStorageService.setLang(lang);

      let title = 'GKC';

      if (this.breadcrumbs) {
        title = (this.breadcrumbs.length > 1) ? (this.breadcrumbs[this.breadcrumbs.length - 1]['label']['title']) : 'GKC' ;
      }

      this.translateService.get([title])
        .subscribe((res) => {
          this.titleService.setTitle(res[title]);
          // console.log(this.breadcrumbs);
        });

      this.helpService.getHelpFromHTMLFile(this.helpFile)
        .subscribe((helpContext) => {
          this.helpContext = helpContext;
          // console.log(helpContext);
        });
    });

    /**
     * TOAST
     *
     * action(message: string, title?: string, override?: IndividualConfig)
     * - show, success, error, info, warning
     *
     * config
     * toast time to live in milliseconds
     * default: 5000
     * @param timeOut?: number | any;
     *
     * toast show close button
     * default: false
     * @param closeButton?: boolean;
     *
     * *********************************************
     * time to close after a user hovers over toast
     * show toast progress bar
     * default: false
     *
     * extendedTimeOut?: number;
     * @param extendedTimeOut?: number | any;
     *
     * show toast progress bar
     * default: false
     * @param progressBar?: boolean;
     *
     * render html in toast message (possibly unsafe)
     * default: false
     * @param enableHtml?: boolean;
     *
     * css class on toast component
     * default: toast
     * @param toastClass?: string;
     *
     * css class on toast container
     * default: toast-top-right
     * @param positionClass?: string | any;
     *
     * css class on to toast title
     * default: toast-title
     * @param titleClass?: string;
     *
     * css class on to toast title
     * default: toast-title
     * @param messageClass?: string;
     *
     * clicking on toast dismisses it
     * default: true
     * @param tapToDismiss?: boolean;
     *
     * Angular toast component to be shown
     * default: Toast
     * @param toastComponent?: ComponentType<any> | any;
     *
     * Helps show toast from a websocket or from event outside Angular
     * default: false
     * @param onActivateTick?: boolean;
     */

    this.globalState.subscribeEvent('toast', this.myScope, (toastData) => {
      console.log(toastData);

      const config = {
        timeOut: toastData['timeOut'] ? toastData['timeOut'] : this.toasty['timeOut'],
        extendedTimeOut: toastData['extendedTimeOut'] ? toastData['extendedTimeOut'] : this.toasty['extendedTimeOut'],
        closeButton: (toastData['closeButton']!==undefined) ? toastData['closeButton'] : this.toasty['closeButton'],
        progressBar: (toastData['progressBar']!==undefined) ? toastData['progressBar'] : this.toasty['progressBar'],
        tapToDismiss: (toastData['tapToDismiss']!==undefined) ? toastData['tapToDismiss'] : this.toasty['tapToDismiss'],
        positionClass: toastData['position'] ? toastData['position'] : this.toasty['position'],
        enableHtml: true
      };

      console.log(config);

      // toast-top-right
      // toast-top-left
      // toast-top-center
      // toast-top-full-width
      // toast-bottom-left
      // toast-bottom-right
      // toast-bottom-center
      // toast-bottom-full-width
      switch (toastData.type) {
        case 'info':
          this.toastrService.info(toastData.message, toastData.title, config);
          break;
        case 'success':
          // config['titleClass'] = 'yellow';
          // config['messageClass'] = 'pink';
          // config['toastClass'] = 'black';

          this.toastrService.success(toastData.message, toastData.title, config);
          break;
        case 'wait':
          // this.toastyService.wait(this.toastOptions);
          break;
        case 'error':
          this.toastrService.error(toastData.message, toastData.title, config);
          break;
        case 'warning':
          this.toastrService.warning(toastData.message, toastData.title, config);
          break;
        default:
          break;
      }
    });
  }

  unsubscribeLocalState() {
    this.globalState.unsubscribeEvent('help', this.myScope);

    this.globalState.unsubscribeEvent('sidebarMenu', this.myScope);

    this.globalState.unsubscribeEvent('language', this.myScope);

    this.globalState.unsubscribeEvent('toast', this.myScope);
  }

  /* COMPONENT OPERATION */

  getState(outlet) {
    console.log(outlet);
    return outlet.activatedRouteData.state;
  }

  /**
   * [THEMES FUNCTIONS]
   * @function toggleMode
   * @function setStaticMode
   * @function setOverlayMode
   * @function showSideNav
   * @function changeSkin
   */
  toggleMode() {
    if (this.isFixed) {
      this.setOverlayMode();
    } else {
      this.setStaticMode();
    }
  }

  setStaticMode() {
    this.isFixed = true;
    this.sidenav.setShown(true);

    const elBody = document.getElementsByTagName('body')[0];
    elBody.className = this.bodySkin + ' fixed-sn';

    this.sidenav.show();

    const el = document.getElementById('sidenav-overlay');
    setTimeout(() => {
      el.style.display = 'none';
      console.log(el.style.display);
    }, 300);
  }

  setOverlayMode() {
    this.isFixed = false;
    this.sidenav.setShown(false);

    const elBody = document.getElementsByTagName('body')[0];
    elBody.className = this.bodySkin + ' hidden-sn';

    this.sidenav.hide();
  }

  showSideNav() {
    this.sidenav.show();
  }

  changeSkin(skin) {
    const element = document.getElementsByTagName('body')[0];

    this.bodySkin = skin;

    if (this.isFixed) {
      element.className = skin + ' fixed-sn';
    } else {
      element.className = skin + ' hidden-sn';
    }
  }

  /**
   * [NOTIFICATIONS FUNCTION]
   * @function openNotification
   * @function openMessage
   * @function changeLanguage
   */
  openNotification(item) {
    console.log(item);
    const target = item.id ? item.id : item._id;
    this.tcodeService.executeTcode(item.tcode, target);
    return false; // prevent a href automatically link
  }

  openMessage(item) {
    console.log(item);
    const target = item.id ? item.id : item._id;
    this.tcodeService.executeTcode(item.tcode, target);
    return false; // prevent a href automatically link
  }

  public changeLanguage(lang: string) {
    this.globalState.notifyMyDataChanged('language', '', lang);
    return false; // prevent a href automatically link
  }

  /**
   * [SMALL ICONS FUNCTIONS]
   * @function logOut
   */
  public logOut() {
    this.securityService.logOut();
    this.navigationService.gotoLanding();
  }

  /**
   * [TRANSACTION CODE FUNCTION]
   * @function keyDownFunction
   * @function gotoTcode
   */
  public keyDownFunction(event) {
    if ((event.keyCode === 13) && (this.tcodeExecution.trim())) {
      const url: string = this.tcodeService.urlLead(this.tcodeExecution);
      console.log(url);
      // this.tcodeExecution = '';
      this.router.navigate([url]);
    }
  }

  gotoTcode(tcode) {
    console.log(tcode);
    this.tcodeService.executeTcode(tcode);
    return false; // prevent a href automatically link
  }

  /**
   * [SIDEBAR MENU FUNCTION]
   * @function selectMenu
   */

  /**
  * @function selectMenu
  * First handler of menu once user click for command execution
  * @param  $event [description]
  * @param  item   [description]
  * @return        [description]
  */
  selectMenu($event, item) {
    console.log(item);
    $event.preventDefault();
    this.selectedMenu = (this.selectedMenu === item ? null : item);
    event.stopPropagation(); // To prevent event escalate to upper menu level
    if (typeof item.data.command === 'function') {
      item.data.command(event);
    } else {
      if (item.data.url) {
        this.router.navigate([item.data.url]);
      }
    }
    return false; // To prevent href work automatically
  }

  /**
   * [RETURN PREVIOUS]
   * @function returnPrevious
   */
  returnPrevious() {
    console.log('Return previous');
    if (this.navigationService.canReturn()) {
      this.navigationService.returnPrevious();
    } else {
      this.translateService.get([
        'navigation',
        'top_of_history'
      ])
        .subscribe((res) => {
          console.log(res.top_notifications, res.navigation);

          const data = {
            type: 'info',
            message: res.top_of_history,
            title: res.navigation
          };
          this.globalState.notifyMyDataChanged('toast', '', data);
        });
    }
    return false;
  }

  /**
   * [WORKING BAR FUNCTIONS]
   * @function toggleWkBar
   * @function changeLge
   * @function changeYear
   */
  toggleTcodeBar() {
    this.tcodeBarStatus = !this.tcodeBarStatus;
    // this.localStorageService.setWkBar(this.wkBarStatus);
    return false; // prevent a href automatically link
  }

  changePrefix() {
    console.log(this.selectedPrefix);
  }

  changeAction() {
    console.log(this.selectedAction);
  }

  execute() {
    if (this.selectedPrefix && this.selectedAction) {
      console.log(this.selectedPrefix + this.selectedAction);
    }
  }

  toggleWkBar() {
    this.wkBarStatus = !this.wkBarStatus;
    this.localStorageService.setWkBar(this.wkBarStatus);
    return false; // prevent a href automatically link
  }

  changeLge() {
    console.log(this.selectedLge);
    this.localStorageService.setWkLge(this.selectedLge);
  }

  changeYear() {
    console.log(this.selectedYear);
    this.localStorageService.setWkYear(this.selectedYear);
  }

}
