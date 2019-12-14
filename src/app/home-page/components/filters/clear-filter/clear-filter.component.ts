import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FilterService } from 'src/app/home-page/services/filter.service';
import { BaseFilter } from '../base-filter';

@Component({
  selector: 'app-clear-filter',
  templateUrl: './clear-filter.component.html',
  styleUrls: ['./clear-filter.component.less']
})
export class ClearFilterComponent extends BaseFilter implements OnInit {
  private clearAction$ = new Subject<boolean>();

  constructor(filterService: FilterService) {
    super(filterService);
    filterService.setClearFilter$(this.clearAction$);
  }
  ngOnInit() {
  }


  onBtnClick() {
    this.clearAction$.next(true);
  }


  ngOnDestory() {
    this.clearAction$.unsubscribe();
  }

}
