import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/**
* NGA contains global accessible module to
* - Directives
* - Pipes
* - Services
* - Validators
*
* NGA components are independent and include on the demand
*/

// DIRECTIVES
import {
  DebounceClickDirective,
  DisableControlDirective
} from './directives';

const NGA_DIRECTIVES = [
  DebounceClickDirective,
  DisableControlDirective
];

// PIPES
import {
 SafeHTMLPipe,
 SafeResourceURLPipe,
 SafeScriptPipe,
 SafeStylePipe,
 SafeURLPipe
} from './pipes';

const NGA_PIPES = [
  SafeHTMLPipe,
  SafeResourceURLPipe,
  SafeScriptPipe,
  SafeStylePipe,
  SafeURLPipe
];

// SERVICES
import {
  ArrayService,
  ColorService,
  DashboardHelperService,
  FileService,
  HelperService,
  ObjectService,
  PaginationService,
  SessionService,
  UtilsService,
} from './services';

const NGA_SERVICES = [
  ArrayService,
  ColorService,
  DashboardHelperService,
  FileService,
  HelperService,
  ObjectService,
  PaginationService,
  SessionService,
  UtilsService,
];

// VALIDATORS
import {
  EmailValidator,
  EqualPasswordsValidator,
} from './validators';

const NGA_VALIDATORS = [
  EmailValidator,
  EqualPasswordsValidator,
];

@NgModule({
  declarations: [
    ...NGA_DIRECTIVES,
    ...NGA_PIPES,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ...NGA_DIRECTIVES,
    ...NGA_PIPES,
  ],
})
export class NgaModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: NgaModule,
      providers: [
        ...NGA_VALIDATORS,
        ...NGA_SERVICES,
      ],
    };
  }
}
