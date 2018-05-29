// External
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

// Internal
import { GlobalState } from '../../../global.state';
import { TcodeService } from '../../../_system/services/tcode.service';

import { PaginationService } from '../../../_system/services/pagination.service';

@Component({
  selector: 'app-data-view',
  templateUrl: './dataView.html',
  styleUrls: ['./dataView.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DataView implements OnInit, OnDestroy {

  myScope = 'data-view';

  // Component Properties & Styles
  @Input() title = '';
  @Input() displayType = 'grid';
  @Input() cardHeight = 'card-md';
  @Input() loading = 'line';

  // Component Data In/ Out
  @Input() body = [];
  @Output() onPageChange: EventEmitter<any> = new EventEmitter();

  public form: FormGroup;

  customBar = true;
  filter: string;
  sortBy: string;

  currentPage = 1;
  pageSize = 10;
  pagination: any;
  totalItems: any;

  optionsSelect: Array<any>;
  selectedHoverStyle: number;
  hoverStyles = [
    'hover-up',
    'hover-down',
    'hover-left',
    'hover-right',
    'hover-up-left',
    'hover-up-right',
    'hover-down-left',
    'hover-down-right',
    'hover-scale-in',
    'hover-scale-out'
  ];
  constructor(
    private translate: TranslateService,

    private fb: FormBuilder,

    private globalState: GlobalState,
    private tcodeService: TcodeService,
    private paginationService: PaginationService
  ) {
    this.subscribeGlobalState();

    this.form = fb.group({
      'search': ['', Validators.compose([])]
    });

    this.selectedHoverStyle = Math.floor(Math.random() * 10);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.body) {
      console.log(this.body);
      this.totalItems = this.body['data'] ? this.body['data'].total : 0;
      if (this.totalItems) {
        // totalItems
        this.pagination = this.paginationService.getPager(this.totalItems, this.currentPage, this.pageSize );
        console.log(this.pagination);
      }

    }
  }

  ngOnInit() {
    console.log(this.body);

    this.optionsSelect = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
    ];
  }

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

  /* COMPONENT OPERATION */
  toggleCustomBar() {
    this.customBar = !this.customBar;
  }

  setDisplayType(value) {
    this.displayType = value;
  }

  firstPage() {
    this.currentPage = 1;
    this.calculatePager();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
      this.pagination['currentPage'] = this.currentPage;
      this.calculatePager();
    }
  }

  nextPage() {
    if (this.currentPage < this.pagination['totalPages']) {
      this.currentPage = this.currentPage + 1;
      this.pagination['currentPage'] = this.currentPage;
      this.calculatePager();
    }
  }

  lastPage() {
    this.currentPage = this.pagination['totalPages'];
    this.calculatePager();
  }

  setPage(page) {
    this.currentPage = page;
    this.calculatePager();
  }

  calculatePager() {
    if (this.totalItems) {
      this.pagination = this.paginationService.getPager(this.totalItems, this.currentPage, this.pageSize );
      console.log(this.pagination);
    }

    const changes = {
      filter: this.form.value.search,
      sort: '',
      first: this.currentPage,
      rows: this.pageSize
    }

    this.onPageChange.emit(changes);
  }
}
