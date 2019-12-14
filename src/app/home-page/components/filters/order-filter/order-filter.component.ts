import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseFilter } from '../base-filter';
import { FilterService } from 'src/app/home-page/services/filter.service';

export enum eOrderType {
  descenging = -1,
  noOrder = 0,
  ascending = 1,
}

export class OrderFilter {
  title: string;
  value: eOrderType;
}

@Component({
  selector: 'app-order-filter',
  templateUrl: './order-filter.component.html',
  styleUrls: ['./order-filter.component.less']
})
export class OrderFilterComponent extends BaseFilter implements OnInit, OnDestroy {
  orders = this.getOrders();
  selectedOrder = eOrderType.noOrder;
  private order$ = new BehaviorSubject<eOrderType>(this.selectedOrder);

  constructor(filterService: FilterService) {
    super(filterService);
    filterService.setOrderFilter$(this.order$);
  }

  ngOnInit() {
  }

  onOrderChange(sort: eOrderType) {
    this.selectedOrder = sort;
    this.order$.next(sort);
  }

  clear() {
    this.selectedOrder = eOrderType.noOrder;
    this.order$.next(this.selectedOrder);
  }

  private getOrders(): OrderFilter[] {
    return [{
      title: 'Ascending order',
      value: eOrderType.ascending,
    },
    {
      title: 'Descending order',
      value: eOrderType.descenging,
    }
    ];
  }

  ngOnDestroy() {
    this.order$.unsubscribe();
  }

}
