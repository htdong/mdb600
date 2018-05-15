import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { EmailValidator } from '../../_system/validators';

import { AuthenticationService } from '../../_system/services/authentication.service';
import { LocalStorageService } from '../../_system/services/localStorage.service';
import { SecurityService } from '../../_system/services/security.service';
import { TcodeService } from '../../_system/services/tcode.service';

@Component({
  templateUrl: 'login.html',
  styleUrls: [ 'login.scss' ]
})
export class LoginComponent implements OnInit, OnDestroy {

  // bodySkin = 'mdb-skin bg-skin-lp fixed-sn';

  public form: FormGroup;
  // public username: AbstractControl;
  public email: AbstractControl;
  public password: AbstractControl;
  public token: AbstractControl;
  public submitted = false;

  model: any = {};
  loading = false;
  returnUrl: string;
  message: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private fb: FormBuilder,

    private authenticationService: AuthenticationService,
    private localStorageService: LocalStorageService,
    private securityService: SecurityService,
    private tcodeService: TcodeService,
  ) {
    // Initialize language
    translate.use(localStorageService.getLang());

    // get token
    this.model.token = this.securityService.getToken();

    // reset login status
    this.securityService.logOut();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

    this.form = fb.group({
      // 'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      'token': [this.model.token, Validators.compose([Validators.required, Validators.minLength(4)])],
    });

    // this.username = this.form.controls['username'];
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    this.token = this.form.controls['token'];
  }

  ngOnInit() {
    // const element = document.getElementsByTagName('body')[0];
    // element.className = this.bodySkin;
  }

  ngOnDestroy() {}

  /**
  * @function onSubmit
  * Check the dirty state of the form
  */
  public onSubmit(values: Object): void {
    this.submitted = true;
    if (this.form.valid) {
      // console.log(values);
      this.login();
    }
  }

  /**
  * @function login
  * Manage message of login form
  */
  login() {
    this.loading = true;
    this.message = '';
    this.securityService.setToken(this.model.token);
    this.authenticationService.login(this.model.email, this.model.password, this.model.token)
      .subscribe(
        data => {
          // console.log(this.returnUrl);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
          switch (error.status) {
            case 400:
              this.message = 'invalid_token';
              break;

            case 401:
              this.message = 'incorrect_password';
              break;

            case 404:
              this.message = 'identity_not_exist';
              break;

            default:
              this.message = 'fail_login';
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
