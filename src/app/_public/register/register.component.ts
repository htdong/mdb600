import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { EmailValidator, EqualPasswordsValidator } from '../../_system/validators';

import { LocalStorageService } from '../../_system/services/localStorage.service';
import { SecurityService } from '../../_system/services/security.service';
import { TcodeService } from '../../_system/services/tcode.service';

import { UserService } from '../../_system/services/user.service';

/**
* @module RegisterComponent
* Component for registration page
*
* FIXME:
* In this component, it keep both NgModel and Reactive Form
* To keep knowledge on how to use them, thus could be simplifed
*/

@Component({
  templateUrl: 'register.html',
  styleUrls: [ 'register.scss' ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  // bodySkin = 'mdb-skin bg-skin-lp fixed-sn';

  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public repeatPassword: AbstractControl;
  public passwords: FormGroup;
  public token: AbstractControl;
  public submitted = false;

  model: any = {};
  loading = false;
  message: string;

  constructor(
    private router: Router,

    private translateService: TranslateService,

    private fb: FormBuilder,

    private localStorageService: LocalStorageService,
    private securityService: SecurityService,
    private tcodeService: TcodeService,

    private userService: UserService,
  ) {
    // Initialize language
    translateService.use(localStorageService.getLang());
    // get token
    this.model.token = this.securityService.getToken();

    this.form = fb.group(
      {
        'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
        'passwords': fb.group(
          {
            'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
          },
          {
            validator: EqualPasswordsValidator.validate('password', 'repeatPassword'),
          },
        ),
        'token': [this.model.token, Validators.compose([Validators.required, Validators.minLength(4)])],
    });

    this.email = this.form.controls['email'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
    this.token = this.form.controls['token'];
  }

  ngOnInit() {
    // const element = document.getElementsByTagName('body')[0];
    // element.className = this.bodySkin;
  }

  ngOnDestroy() {
  }

  /**
  * @function onSubmit
  * Check form dirty state
  */
  public onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      console.log(this.form.value);

      this.register();
    }
  }

  /**
  * @function register
  * Manage message for register form
  */
  register() {
    this.loading = true;
    // this.securityService.setToken(this.model.token);
    // console.log(this.model);
    this.userService.create(this.model)
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error);
          switch (error.status) {
            case 400:
              this.message = 'invalid_token';
              break;
            case 404:
              this.message = 'client_not_exist';
              break;
            case 412:
              this.message = 'user_email_exist';
              break;
            case 500:
              this.message = '500';
              break;
            default:
              this.message = 'fail_registration';
              break;
          }
          this.loading = false;

          setTimeout(() => {
            this.message = '';
          }, 3000);
        });
    }

    /**
    * @function gotoPage
    * Goto a page
    */
    gotoPage(page) {
      this.tcodeService.executeTcode(page);
    }

}
