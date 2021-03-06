import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { GlobalState } from '../../global.state';
import { HelpService } from '../../_system/services/help.service';
import { LocalStorageService } from '../../_system/services/localStorage.service';
import { NavigationService } from '../../_system/services/navigation.service';
import { MenuService } from '../../_system/services/menu.service';

import { BaseComponent } from '../../_system/_base/base.component';

import { AppDoubleNavLayoutComponent } from '../../_system/_layouts/doubleNavsLayout.component';

@Component({
  templateUrl: 'themes.html',
  styleUrls: [ 'themes.scss' ]
})
export class ThemesComponent extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'theme';

  // Override Base class properties

  sidebarMenuJSONFile = '';

  helpFile = 'home';

  globalConfig = {
    language: true,
    trackHistory: true
  };

  // Derive class properties
  menu: any[];

  public form: FormGroup;

  toast: any;
  favTopPosition: boolean;

  cardColors = {
    color: 'mdb-color',
    ext: ''
  };

  // card_color = 'indigo';
  // card_color_ext = '';

  buttonStyle = {
    fill: 'btn',
    shape: ''
  };

  // button_fill = 'btn';
  // button_shape = '';

  debug: boolean;

  tasks: any[];

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public helpService: HelpService,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services
    public app: AppDoubleNavLayoutComponent,
    private fb: FormBuilder,
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, helpService, localStorageService, menuService, navigationService);

    // Derive class constructor

    // Reinstate user preference
    const env = this.localStorageService.getEnv();

    this.favTopPosition = this.localStorageService.getFavPosition(env);
    this.toast = this.localStorageService.getToasty(env);

    this.cardColors = this.localStorageService.getCardColors(env);
    this.buttonStyle = this.localStorageService.getButtonStyle(env);
    this.debug = this.localStorageService.getDebugMode(env);

    // Refresh sidebar menu to update Fav menu position
    this.menu = this.initMenu();
    this.refreshSidebarMenu(false);

    this.form = fb.group({
      'title': ['', Validators.compose([Validators.required])],
      'message': ['', Validators.compose([Validators.required])],
      'type': ['', Validators.compose([Validators.required])],
      'position': [this.toast['position'], Validators.compose([Validators.required])],
      'timeOut': [this.toast['timeOut'], Validators.compose([Validators.required])],
      'extendedTimeOut': [this.toast['extendedTimeOut'], Validators.compose([Validators.required])],
      'closeButton': [this.toast['closeButton'], Validators.compose([Validators.required])],
      'progressBar': [this.toast['progressBar'], Validators.compose([Validators.required])],
      'tapToDismiss': [this.toast['tapToDismiss'], Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    /* Base class initialization */
    super.ngOnInit();
    // this.subscribeGlobalState();

    /* Derive class initialization */
    this.initTasks();
  }

  ngOnDestroy() {
    /* Base class destroy */
    super.ngOnDestroy();
  }

  initMenu() {
    return [
      { data: { label: 'back_to_home', icon: 'home', url: '/home' } },
      {
        data: { label: 'menu_modes', icon: 'th' },
        children: [
          { data: { label: 'static_menu', icon: 'list', command: (event) => this.app.setStaticMode() }},
          { data: { label: 'overlay_menu', icon: 'bars', command: (event) => this.app.setOverlayMode() }}
        ]
      },
      {
        data: { label: 'themes', icon: 'paint-brush' },
        children: [
          { data: { label: 'white', icon: 'tint', command: (event) => this.app.changeSkin('white-skin') }},
          { data: { label: 'black', icon: 'tint', command: (event) => this.app.changeSkin('black-skin') }},
          { data: { label: 'cyan', icon: 'tint', command: (event) => this.app.changeSkin('cyan-skin') }},
          { data: { label: 'mdb', icon: 'tint', command: (event) => this.app.changeSkin('mdb-skin') }},
          { data: { label: 'deep_purple', icon: 'tint', command: (event) => this.app.changeSkin('deep-purple-skin') }},
          { data: { label: 'navy_blue', icon: 'tint', command: (event) => this.app.changeSkin('navy-blue-skin') }},
          { data: { label: 'pink', icon: 'tint', command: (event) => this.app.changeSkin('pink-skin') }},
          { data: { label: 'indigo', icon: 'tint', command: (event) => this.app.changeSkin('indigo-skin') }},
          { data: { label: 'light_blue', icon: 'tint', command: (event) => this.app.changeSkin('light-blue-skin') }},
          { data: { label: 'grey', icon: 'tint', command: (event) => this.app.changeSkin('grey-skin') }},
        ]
      },
      {
        data: { label: 'card_color', icon: 'square' },
        children: [
          { data: { label: 'red', icon: 'tint', command: (event) => this.change_card_color('red') }},
          { data: { label: 'pink', icon: 'tint', command: (event) => this.change_card_color('pink') }},
          { data: { label: 'purple', icon: 'tint', command: (event) => this.change_card_color('purple') }},
          { data: { label: 'deep_purple', icon: 'tint', command: (event) => this.change_card_color('deep-purple') }},
          { data: { label: 'indigo', icon: 'tint', command: (event) => this.change_card_color('indigo') }},
          { data: { label: 'blue', icon: 'tint', command: (event) => this.change_card_color('blue') }},
          { data: { label: 'light_blue', icon: 'tint', command: (event) => this.change_card_color('light-blue') }},
          { data: { label: 'cyan', icon: 'tint', command: (event) => this.change_card_color('cyan') }},
          { data: { label: 'teal', icon: 'tint', command: (event) => this.change_card_color('teal') }},
          { data: { label: 'green', icon: 'tint', command: (event) => this.change_card_color('green') }},
          { data: { label: 'light_green', icon: 'tint', command: (event) => this.change_card_color('light-green') }},
          { data: { label: 'lime', icon: 'tint', command: (event) => this.change_card_color('lime') }},
          { data: { label: 'yellow', icon: 'tint', command: (event) => this.change_card_color('yellow') }},
          { data: { label: 'amber', icon: 'tint', command: (event) => this.change_card_color('amber') }},
          { data: { label: 'orange', icon: 'tint', command: (event) => this.change_card_color('orange') }},
          { data: { label: 'deep_orange', icon: 'tint', command: (event) => this.change_card_color('deep-orange') }},
          { data: { label: 'brown', icon: 'tint', command: (event) => this.change_card_color('brown') }},
          { data: { label: 'grey', icon: 'tint', command: (event) => this.change_card_color('grey') }},
          { data: { label: 'blue_grey', icon: 'tint', command: (event) => this.change_card_color('blue-grey') }},
          { data: { label: 'black', icon: 'tint', command: (event) => this.change_card_color('black') }},
          { data: { label: 'mdb', icon: 'tint', command: (event) => this.change_card_color('mdb-color') }},

          { data: { label: 'purple_gradient', icon: 'tint', command: (event) => this.change_card_color('purple-gradient') }},
          { data: { label: 'peach_gradient', icon: 'tint', command: (event) => this.change_card_color('peach-gradient') }},
          { data: { label: 'blue_gradient', icon: 'tint', command: (event) => this.change_card_color('blue-gradient') }},
        ]
      },
      {
        data: { label: 'card_color_ext', icon: 'arrows-h' },
        children: [
          { data: { label: 'lighten_5', icon: 'tint', command: (event) => this.change_card_color_ext('lighten-5') }},
          { data: { label: 'lighten_4', icon: 'tint', command: (event) => this.change_card_color_ext('lighten-4') }},
          { data: { label: 'lighten_3', icon: 'tint', command: (event) => this.change_card_color_ext('lighten-3') }},
          { data: { label: 'lighten_2', icon: 'tint', command: (event) => this.change_card_color_ext('lighten-2') }},
          { data: { label: 'lighten_1', icon: 'tint', command: (event) => this.change_card_color_ext('lighten-1') }},
          { data: { label: 'normal', icon: 'tint', command: (event) => this.change_card_color_ext('') }},
          { data: { label: 'darken_1', icon: 'tint', command: (event) => this.change_card_color_ext('darken-1') }},
          { data: { label: 'darken_2', icon: 'tint', command: (event) => this.change_card_color_ext('darken-2') }},
          { data: { label: 'darken_3', icon: 'tint', command: (event) => this.change_card_color_ext('darken-3') }},
          { data: { label: 'darken_4', icon: 'tint', command: (event) => this.change_card_color_ext('darken-4') }},
          { data: { label: 'accent_1', icon: 'tint', command: (event) => this.change_card_color_ext('accent-1') }},
          { data: { label: 'accent_2', icon: 'tint', command: (event) => this.change_card_color_ext('accent-2') }},
          { data: { label: 'accent_3', icon: 'tint', command: (event) => this.change_card_color_ext('accent-3') }},
          { data: { label: 'accent_4', icon: 'tint', command: (event) => this.change_card_color_ext('accent-4') }}
        ]
      },
      {
        data: { label: 'btn', icon: 'hand-pointer-o' },
        children: [
          { data: { label: 'btn_fill', icon: 'tint', command: (event) => this.change_button_fill() }},
          { data: { label: 'btn_shape', icon: 'square', command: (event) => this.change_button_shape() }},
        ]
      },
      {
        data: {label: 'shape', icon: 'lemon-o'},
        children: [
          { data: {label: 'circle_shape', icon: 'circle-o',
            command: (event) => {this.globalState.notifyMyDataChanged('navType', '', 'circle'); }}},
          { data: {label: 'square_shape', icon: 'square-o',
            command: (event) => {this.globalState.notifyMyDataChanged('navType', '', 'square'); }}},
        ]
      },
      {
        data: {label: 'shape_effect', icon: 'sliders'},
        children: [
          { data: {label: 'Effect 1', icon: 'adjust',
            command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect1'); }}},
          { data: {label: 'Effect 2', icon: 'adjust',
            command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect2'); }}},
          { data: {label: 'Effect 3', icon: 'adjust',
            command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect3'); }}},
          { data: {label: 'Effect 4', icon: 'adjust',
            command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect4'); }}},
          { data: {label: 'Effect 5', icon: 'adjust',
            command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect5'); }}},
          { data: {label: 'Effect 6', icon: 'adjust',
            command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect6'); }}},
          { data: {label: 'Effect 7', icon: 'adjust',
            command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect7'); }}},
          { data: {label: 'Effect 8', icon: 'adjust',
            command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect8'); }}},
          { data: {label: 'Effect 9', icon: 'adjust',
            command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect9'); }}},
          { data: {label: 'Effect 10', icon: 'adjust',
            command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect10'); }}},
          { data: {label: 'Effect 11', icon: 'adjust',
            command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect11'); }}},
          { data: {label: 'Effect 12', icon: 'adjust',
            command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect12'); }}},
          { data: {label: 'Effect 13', icon: 'adjust',
            command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect13'); }}},
          { data: {label: 'Effect 14', icon: 'adjust',
            command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect14'); }}},
          { data: {label: 'Effect 15', icon: 'adjust',
            command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect15'); }}},
          { data: {label: 'Effect 16 (Circle only)', icon: 'adjust',
            command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect16'); }}},
          { data: {label: 'Effect 17 (Circle only)', icon: 'adjust',
            command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect17'); }}},
          { data: {label: 'Effect 18 (Circle only)', icon: 'adjust',
            command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect18'); }}},
          { data: {label: 'Effect 19 (Circle only)', icon: 'adjust',
            command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect19'); }}},
          { data: {label: 'Effect 20 (Circle only)', icon: 'adjust',
            command: (event) => { this.globalState.notifyMyDataChanged('navEffect', '', 'effect20'); }}},
        ]
      },
      {
        data: { label: 'others', icon: 'asterisk' },
        children: [
          { data: { label: 'toggle_fav_position', icon: 'star-o', command: (event) => this.refreshSidebarMenu(true) }},
          { data: { label: 'toggle_debud_mode', icon: 'bug', command: (event) => this.toggle_debug() }},
        ]
      },
    ];
  }

  change_card_color(color) {
    this.cardColors.color = color;
    // this.card_color = color;
    this.localStorageService.setCardColors(this.cardColors);
  }

  change_card_color_ext(value) {
    this.cardColors.ext = value;
    // this.card_color_ext = value;
    this.localStorageService.setCardColors(this.cardColors);
  }

  change_button_fill() {
    if (this.buttonStyle.fill =='btn') {
      this.buttonStyle.fill = 'btn-outline';
    } else {
      this.buttonStyle.fill = 'btn';
    }
    this.localStorageService.setButtonStyle(this.buttonStyle);
  }

  change_button_shape() {
    if (this.buttonStyle.shape =='') {
      this.buttonStyle.shape = 'btn-rounded';
    } else {
      this.buttonStyle.shape = '';
    }
    this.localStorageService.setButtonStyle(this.buttonStyle);
  }

  toggle_debug() {
    this.debug = !this.debug;
    this.localStorageService.setDebugMode(this.debug);
  }

  refreshSidebarMenu(toggle: boolean = false) {
    const fav = this.localStorageService.getFav();
    const currentPosition = this.localStorageService.getFavPosition();
    this.favTopPosition = toggle ? !currentPosition : currentPosition;

    console.log(this.favTopPosition);

    if (this.favTopPosition) {
      fav.push(...this.menu);
      console.log(fav);
      this.globalState.notifyMyDataChanged('sidebarMenu', '', fav);
    } else {
      const changedMenu = [...this.menu, ...fav];
      console.log(changedMenu);
      this.globalState.notifyMyDataChanged('sidebarMenu', '', changedMenu);
    }

    this.localStorageService.setFavPosition(this.favTopPosition);
  }

  /**
   *  [COMPONENT FUNCTIONS]
   * @function changeLanguage
   */

  public changeLanguage(lang: string) {
    this.localStorageService.setLang(lang);
    this.translateService.use(lang);
  }

  openToast() {
    console.log(this.form.value);

    const toast = this.form.value;

    const data = {
      type: this.form.valid ? toast.type : 'warning',
      position: toast.position,
      timeOut: toast.timeOut,
      extendedTimeOut: toast.extendedTimeOut,
      closeButton: toast.closeButton,
      progressBar: toast.progressBar,
      tapToDismiss: toast.tapToDismiss,
      title: this.form.valid ? toast.title : 'Missing info!',
      message: this.form.valid ? toast.message : 'Complete all information!',
    };

    this.globalState.notifyMyDataChanged('toast', '', data);
  }

  saveToast() {
    console.log(this.form.value);

    if (this.form.valid) {
      const toast = this.form.value;

      this.localStorageService.setToasty({
        position: toast.position,
        timeOut: toast.timeOut,
        extendedTimeOut: toast.extendedTimeOut,
        closeButton: toast.closeButton,
        progressBar: toast.progressBar,
        tapToDismiss: toast.tapToDismiss
      });

      const data = {
        type: 'success',
        position: toast.position,
        timeOut: toast.timeOut,
        extendedTimeOut: toast.extendedTimeOut,
        closeButton: toast.closeButton,
        progressBar: toast.progressBar,
        tapToDismiss: toast.tapToDismiss,
        title: 'Success',
        message: 'Success',
      };

      this.globalState.notifyMyDataChanged('toast', '', data);
    }
  }

  initTasks() {
    const orgImagePath = 'settings/';
    this.tasks = [
      {
        tcode:  'Flower01',
        title:  'Flower 01',
        url:    '/theme',
        img: orgImagePath + 'circle/1.jpg',
        squareImg: orgImagePath + 'square/1.jpg',
      },
      {
        tcode:  'Flower02',
        title:  'Flower 02',
        url:    '/theme',
        img: orgImagePath + 'circle/2.jpg',
        squareImg: orgImagePath + 'square/2.jpg',
      },
      {
        tcode:  'Flower03',
        title:  'Flower 03',
        url:    '/theme',
        img: orgImagePath + 'circle/3.jpg',
        squareImg: orgImagePath + 'square/3.jpg',
      },
      {
        tcode:  'Flower04',
        title:  'Flower 04',
        url:    '/theme',
        img: orgImagePath + 'circle/4.jpg',
        squareImg: orgImagePath + 'square/4.jpg',
      },
      {
        tcode:  'Flower05',
        title:  'Flower 05',
        url:    '/theme',
        img: orgImagePath + 'circle/5.jpg',
        squareImg: orgImagePath + 'square/5.jpg',
      },
      {
        tcode:  'Flower06',
        title:  'Flower 06',
        url:    '/theme',
        img: orgImagePath + 'circle/6.jpg',
        squareImg: orgImagePath + 'square/6.jpg',
      },
      {
        tcode:  'Flower07',
        title:  'Flower 07',
        url:    '/theme',
        img: orgImagePath + 'circle/7.jpg',
        squareImg: orgImagePath + 'square/7.jpg',
      },
      {
        tcode:  'Flower08',
        title:  'Flower 08',
        url:    '/theme',
        img: orgImagePath + 'circle/8.jpg',
        squareImg: orgImagePath + 'square/8.jpg',
      }
    ];
  }
}
