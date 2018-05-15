import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { EmailValidator, EqualPasswordsValidator } from '../../_system/validators';

import { LocalStorageService } from '../../_system/services/localStorage.service';
import { SecurityService } from '../../_system/services/security.service';
import { TcodeService } from '../../_system/services/tcode.service';

import { UserService } from '../../_system/services/user.service';

/**
* @module ForgotComponent
* Component for Forgot / Reset Password page
*
* @function onSubmit
* @function forgot
* @function gotoPage
*/

@Component({
  templateUrl: 'forgot.html',
  styleUrls: [ './forgot.scss' ]
})
export class ForgotComponent implements OnInit, OnDestroy {

  // bodySkin = 'mdb-skin bg-skin-lp fixed-sn';

  public form: FormGroup;
  public email: AbstractControl;
  public token: AbstractControl;
  public submitted = false;

  model: any = {};
  loading = false;
  message: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private fb: FormBuilder,

    private localStorageService: LocalStorageService,
    private securityService: SecurityService,
    private tcodeService: TcodeService,

    private userService: UserService,
  ) {
    // Initialize language
    translate.use(localStorageService.getLang());

    // get token
    this.model.token = this.securityService.getToken();

    this.form = fb.group(
      {
        'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
        'token': [this.model.token, Validators.compose([Validators.required, Validators.minLength(4)])],
    });

    this.email = this.form.controls['email'];
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
  * Track if form is submitted or not to set up message
  */
  public onSubmit(values: Object): void {
    this.submitted = true;
    if (this.form.valid) {
      // console.log(values);
      this.forgot();
    }
  }

  /**
  * @function forgot
  * Set up message for forgot form
  */
  forgot() {
    this.loading = true;
    this.securityService.setToken(this.model.token);
    // console.log(this.model);

    this.message = 'deferral'

    this.userService.forgot(this.model)
      .subscribe(
          data => {
            // console.log(data);
            this.message = 'deferral_completed';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);

          },
          error => {
            switch (error.status) {
              case 400:
                this.message = 'invalid_token';
                break;
              case 404:
                this.message = 'identity_not_exist';
                break;
              case 500:
                this.message = '500';
                break;
              default:
                this.message = '500';
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
