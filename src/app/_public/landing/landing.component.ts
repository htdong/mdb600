import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { EmailValidator } from '../../_system/validators';

import { BodyBackgroundService } from '../../_system/services/bodyBackground.service';
import { LocalStorageService } from '../../_system/services/localStorage.service';
import { SecurityService } from '../../_system/services/security.service';
import { TcodeService } from '../../_system/services/tcode.service';

/**
* @module LandingComponent
*
* @function changeLanguage
* @function gotoLogin
*/

@Component({
  templateUrl: 'landing.html',
  styleUrls: [ 'landing.scss' ]
})
export class LandingComponent implements OnInit, OnDestroy {

  bodySkin = 'light-blue-skin';

  public form: FormGroup;
  public name: AbstractControl;
  public email: AbstractControl;
  public phone: AbstractControl;
  public company: AbstractControl;
  public message: AbstractControl;
  public submitted = false;

  model: any = {};

  selectedNavItem ='';

  constructor(
    private fb: FormBuilder,

    private localStorageService: LocalStorageService,
    private bodyBackgroundService: BodyBackgroundService,
    private securityService: SecurityService,
    private tcodeService: TcodeService,
    private translate: TranslateService,
  ) {
    this.form = fb.group(
      {
        'name': [this.model.name, Validators.compose([Validators.required, Validators.minLength(1)])],
        'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
        'phone': ['', Validators.compose([Validators.required])],
        'company': ['', Validators.compose([Validators.required])],
        'message': ['', Validators.compose([Validators.required])]
    });

    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.phone = this.form.controls['phone'];
    this.company = this.form.controls['company'];
    this.message = this.form.controls['message'];
  }

  ngOnInit() {
    const element = document.getElementsByTagName('body')[0];
    element.className = this.bodySkin;
  }

  ngOnDestroy() {}

  /**
  * @function changeLanguage
  * Change language of the page
  *
  * @param {string} lang
  */
  public changeLanguage(lang: string) {
    this.localStorageService.setLang(lang);
    this.translate.use(lang);
  }

  /**
  * @function gotoLogin
  * Goto Login page
  */
  gotoLogin() {
    const securityService = this.securityService.getSavedSession();
    if (securityService) {
      this.tcodeService.executeTcode('lockscreen');
    } else {
      this.tcodeService.executeTcode('login');
    }
  }

  /**
  * @function onSubmit
  * Check form dirty state
  */
  public onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  selectNavItem(item) {
    this.selectedNavItem = item;
  }
}
