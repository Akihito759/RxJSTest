import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { FilterService } from '../../../services/filter.service';
import { BaseFilter } from '../base-filter';
@Component({
  selector: 'app-live-search',
  templateUrl: './live-search.component.html',
  styleUrls: ['./live-search.component.less']
})
export class LiveSearchComponent extends BaseFilter implements OnInit {
  filter: FormControl = new FormControl('');
  private filter$: Observable<string> = this.filter.valueChanges.pipe(startWith(''));

  constructor(filterService: FilterService) {
    super(filterService);
    filterService.setLiveSearch$(this.filter$);
  }
  ngOnInit() {
  }

  clear() {
    this.filter.setValue('');
  }
}
