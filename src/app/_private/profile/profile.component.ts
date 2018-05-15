import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { EmailValidator, EqualPasswordsValidator } from '../../_system/validators';

import { AppConfig } from '../../app.config';
import { GlobalState } from '../../global.state';
import { LocalStorageService } from '../../_system/services/localStorage.service';
import { NavigationService } from '../../_system/services/navigation.service';
import { SecurityService } from '../../_system/services/security.service';
import { MenuService } from '../../_system/services/menu.service';

import { BaseComponent } from '../../_system/_base/base.component';

@Component({
  templateUrl: 'profile.html',
  styleUrls: [ 'profile.scss' ]
})
export class ProfileComponent extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'profile';

  // Override Base class properties
  pageTitle = 'profile';

  sidebarMenuJSONFile = 'home.menu.mdb.json';

  globalConfig = {
    language: true,
    trackHistory: true
  };

  helpFile = 'profile';

  public form: FormGroup;
  firstname: AbstractControl;
  lastname: AbstractControl;
  address_first: AbstractControl;
  city: AbstractControl;
  country: AbstractControl;
  alt_email: AbstractControl;
  phone: AbstractControl;
  alt_phone: AbstractControl;

  public formPassword: FormGroup;
  public password: AbstractControl;
  public repeatPassword: AbstractControl;
  public submitted = false;

  model: any = {};
  loading = false;
  returnUrl: string;
  message: string;

  name;
  avatar;
  email;
  token;

  cardColors;
  buttonStyle;

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services
    private appConfig: AppConfig,
    private fb: FormBuilder,
    private fbPassword: FormBuilder,
    private securityService: SecurityService,
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, localStorageService, menuService, navigationService);

    // Derive class constructor
    const env = this.localStorageService.getEnv();
    this.cardColors = this.localStorageService.getCardColors(env);
    this.buttonStyle = this.localStorageService.getButtonStyle(env);

    const savedSession = this.securityService.getSavedSession();

    this.email = savedSession.email;

    if (savedSession.name) {
      this.name = savedSession.name;
    } else {
      const parts = savedSession['email'].split('@');
      this.name = parts[0];
    }

    if (savedSession.avatar) {
      const rootPath = this.appConfig.apiUrl;
      this.avatar = rootPath + '/repo/' + this.securityService.getToken() + '/users/' + savedSession.avatar;
    } else {
      this.avatar = savedSession.gravatar;
    }

    this.form = fb.group({
      'firstname': ['', Validators.compose([Validators.required])],
      'lastname': ['', Validators.compose([Validators.required])],
      'address_first': ['', Validators.compose([Validators.required])],
      'address_second': ['', Validators.compose([])],
      'city': ['', Validators.compose([Validators.required])],
      'postcode': ['', Validators.compose([])],
      'country': ['', Validators.compose([Validators.required])],
      'profile': ['', Validators.compose([])],
      'email': [{value: this.email, disabled: true}, Validators.compose([EmailValidator.validate])],
      'alt_email': ['', Validators.compose([EmailValidator.validate])],
      'phone': ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      'alt_phone': ['', Validators.compose([Validators.pattern('^[0-9]*$')])],
      'ism': ['', Validators.compose([])],
      'alt_ism': ['', Validators.compose([])],
      'contact': ['', Validators.compose([])]
    });
    this.firstname = this.form.controls['firstname'];
    this.lastname = this.form.controls['lastname'];
    this.address_first = this.form.controls['address_first'];
    this.city = this.form.controls['city'];
    this.country = this.form.controls['country'];
    this.alt_email = this.form.controls['alt_email'];
    this.phone = this.form.controls['phone'];
    this.alt_phone = this.form.controls['alt_phone'];

    this.formPassword = fbPassword.group(
      {
        'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      },
      {
        validator: EqualPasswordsValidator.validate('password', 'repeatPassword'),
      }
    );
    this.password = this.formPassword.controls['password'];
    this.repeatPassword = this.formPassword.controls['repeatPassword'];
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
