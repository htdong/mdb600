import { Component, OnInit, OnDestroy, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { UploadFile, UploadInput, UploadOutput } from 'ng-mdb-pro/pro/file-input';
import { humanizeBytes } from 'ng-mdb-pro/pro/file-input';

import { EmailValidator, EqualPasswordsValidator } from '../../_system/validators';

import { AppConfig } from '../../app.config';
import { GlobalState } from '../../global.state';
import { HelpService } from '../../_system/services/help.service';
import { LocalStorageService } from '../../_system/services/localStorage.service';
import { NavigationService } from '../../_system/services/navigation.service';
import { SecurityService } from '../../_system/services/security.service';
import { MenuService } from '../../_system/services/menu.service';

import { BaseComponent } from '../../_system/_base/base.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  templateUrl: 'profile.html',
  styleUrls: [ 'profile.scss' ]
})
export class ProfileComponent extends BaseComponent implements OnInit, OnDestroy {

  myScope = 'profile';

  // Override Base class properties
  pageTitle = 'profile';

  sidebarMenuJSONFile = 'home.menu.mdb.json';

  helpFile = 'profile';

  globalConfig = {
    language: true,
    trackHistory: true
  };

  public form: FormGroup;
  // firstname: AbstractControl;
  // lastname: AbstractControl;
  // address_first: AbstractControl;
  // city: AbstractControl;
  // country: AbstractControl;
  // alt_email: AbstractControl;
  // phone: AbstractControl;
  // alt_phone: AbstractControl;

  public formPassword: FormGroup;
  // public password: AbstractControl;
  // public repeatPassword: AbstractControl;
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

  imageChangedEvent: any = '';
  croppedImage: any = '';

  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  constructor(
    // Base class services
    public translateService: TranslateService,
    public globalState: GlobalState,
    public helpService: HelpService,
    public localStorageService: LocalStorageService,
    public navigationService: NavigationService,
    public menuService: MenuService,

    // Derive class services
    private appConfig: AppConfig,
    private fb: FormBuilder,
    private fbPassword: FormBuilder,
    private securityService: SecurityService,
    public sanitizer: DomSanitizer
  ) {
    // Base class constructor: Re-injection for inheritance
    super(translateService, globalState, helpService, localStorageService, menuService, navigationService);    

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
    // this.firstname = this.form.controls['firstname'];
    // this.lastname = this.form.controls['lastname'];
    // this.address_first = this.form.controls['address_first'];
    // this.city = this.form.controls['city'];
    // this.country = this.form.controls['country'];
    // this.alt_email = this.form.controls['alt_email'];
    // this.phone = this.form.controls['phone'];
    // this.alt_phone = this.form.controls['alt_phone'];

    this.formPassword = fbPassword.group(
      {
        'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      },
      {
        validator: EqualPasswordsValidator.validate('password', 'repeatPassword'),
      }
    );
    // this.password = this.formPassword.controls['password'];
    // this.repeatPassword = this.formPassword.controls['repeatPassword'];

    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
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

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(image: string) {
    // image in Base64 string format
    this.croppedImage = image;
    console.log(image);

    // Make file from Base64 string
    const file = this.imagetoblob(image);
    const blobUrl = URL.createObjectURL(file);
    console.log(file);
    console.log(blobUrl);

    // Test if blobUrl workable
    const img = document.createElement('img');
    img.src = blobUrl;
    document.body.appendChild(img);

    // Form data
    this.formData = new FormData();
    this.formData.append('key1', 'value1');
    this.formData.append('key2', 'value2');
    this.formData.append('file', file);

    console.log(this.formData);
    
  //   for (const value of this.formData.values()) {
  //     console.log(value);
  //  }
    // const outputLog = {};
    // const iterator = this.formData.values();
    // let end = false;

    // while (end === false) {
    //   const item = iterator.next();
    //   if (item.value !== undefined) {
    //       outputLog[item.value[0]] = item.value[1];
    //   } else if (item.done === true) {
    //       end = true;
    //   }
    //     }
    // console.log(outputLog);
  }
  imageLoaded() {
      // show cropper
  }
  loadImageFailed() {
      // show message
  }

  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: '/upload',
      method: 'POST',
      data: { foo: 'bar' },
      concurrency: 1
    };
    console.log (event);
    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  onUploadOutput(output: UploadOutput | any): void {
    if (output.type === 'allAddedToQueue') {
    } else if (output.type === 'addedToQueue') {
      this.files.push(output.file); // add file to array when added
    } else if (output.type === 'uploading') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
    this.showFiles();
  }

  showFiles() {
    let files = '';
    for (let i = 0; i < this.files.length; i ++) {
      files += this.files[i].name;
       if (!(this.files.length - 1 === i)) {
         files += ', ';
      }
    }
    return files;
  }

  imagetoblob(base64Data) {
    // Split the base64 string in data and contentType
    const block = base64Data.split(';');

    // Get the content type of the image
    const contentType = block[0].split(':')[1]; // "image/gif"

    // get the real base64 content of the file
    const realData = block[1].split(',')[1]; // "R0lGODlhPQ...."

    // Convert it to a blob to upload
    return this.b64toBlob(realData, contentType);
  }

  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }


}
