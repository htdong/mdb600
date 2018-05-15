import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { AppConfig } from '../../app.config';
import { AuthenticationService } from '../../_system/services/authentication.service';
import { LocalStorageService } from '../../_system/services/localStorage.service';
import { NavigationService } from '../../_system/services/navigation.service';
import { SecurityService } from '../../_system/services/security.service';
import { TcodeService } from '../../_system/services/tcode.service';

/**
* @module LockscreenComponent
* Component for lockscreen page
*
* @function keyDownFunction
* @function returnSession
*/

@Component({
  templateUrl: 'lockscreen.html',
  styleUrls: [ 'lockscreen.scss' ]
})
export class LockscreenComponent implements OnInit, OnDestroy {

  bodySkin = 'mdb-skin bg-skin-lp fixed-sn';

  public form: FormGroup;
  public password: AbstractControl;
  public submitted = false;

  model: any = {};
  loading = false;
  returnUrl: string;
  message: string;

  name;
  avatar;
  email;
  token;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private fb: FormBuilder,

    private appConfig: AppConfig,
    private authenticationService: AuthenticationService,
    private localStorageService: LocalStorageService,
    private navigationService: NavigationService,
    private securityService: SecurityService,
    private tcodeService: TcodeService,
  ) {
    // Initialize language
    translate.use(localStorageService.getLang());

    this.form = fb.group({
      'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });

    this.password = this.form.controls['password'];
  }

  ngOnInit() {
    const element = document.getElementsByTagName('body')[0];
    element.className = this.bodySkin;

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
  }

  ngOnDestroy() {
  }

  /**
  * @function keyDownFunction
  * To check if user input equals enter
  */
  public keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.returnSession();
    }
  }

  /**
  * @function returnSession
  * Reinstate the session after user logged in
  */
  returnSession() {
    const token = this.securityService.getToken();

    console.log(this.email, this.password.value);
    
    if (this.password) {
      this.authenticationService.login(this.email, this.password.value, token)
        .subscribe(
          data => {
            if (this.navigationService.canReturn()) {
              this.navigationService.returnPrevious();
            } else {
              this.router.navigate(['/home']);
            }
          },
          error => {
            console.log(error);
            this.message = 'incorrect_password';
            this.loading = false;

            setTimeout(() => {
              this.message = '';
            }, 3000);
          });
      }
    }

  /**
  * @function gotoPage
  * Goto a page
  */
  gotoPage(page) {
    this.tcodeService.executeTcode(page);
  }

}
