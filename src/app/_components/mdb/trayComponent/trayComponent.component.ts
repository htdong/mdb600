// External
import { Component, OnInit, OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

// Internal
import { GlobalState } from '../../../global.state';
import { TcodeService } from '../../../_system/services/tcode.service';

@Component({
  selector: 'app-tray-component',
  templateUrl: './trayComponent.html',
})

export class TrayComponent implements OnInit, OnDestroy {

  myScope = 'tray-component';

  constructor(
    private translate: TranslateService,

    private globalState: GlobalState,
    private tcodeService: TcodeService,
  ) {
    this.subscribeGlobalState();
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.unsubscribeGlobalState();
  }

  /* GLOBAL STATE */
  subscribeGlobalState() {
    this.globalState.subscribeEvent('language', this.myScope, (lang) => {
      // console.log(lang);
      this.translate.use(lang);
    });
  }

  unsubscribeGlobalState() {
    this.globalState.unsubscribeEvent('language', this.myScope);
  }

  /* COMPONENT OPERATION */
  gotoTcode(tcode) {
    this.tcodeService.executeTcode(tcode);
  }

}
