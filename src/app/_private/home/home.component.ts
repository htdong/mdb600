import { Component } from '@angular/core';

import { LocalStorageService } from '../../_system/services/localStorage.service';
import { TcodeService } from '../../_system/services/tcode.service';

@Component({
  templateUrl: 'home.html'
})
export class HomeComponent {

  constructor(
    public localStorageService: LocalStorageService,
    public tcodeService: TcodeService
  ) {
    const settings = this.localStorageService.getSettings();
    const tcode =  settings['home'] || 'main';
    console.log(tcode);
    this.tcodeService.executeTcode(tcode);
  }

}
