import { Injectable } from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { eOrderType } from '../components/filters/order-filter/order-filter.component';
import { eMediaType, MediaModel } from '../models/media-model';
import { map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private liveSearchFilter$: Observable<string>;
  private clearFilter$: Observable<boolean>;
  private orderFilter$: Observable<eOrderType>;
  private mediaTypeFilter$: Observable<eMediaType[]>;
  private clearAction$ = new Subject<boolean>();

  constructor() { }

  setLiveSearch$(stream) {
    this.liveSearchFilter$ = stream;
  }

  setClearFilter$(stream) {
    this.clearFilter$ = stream;
    this.clearFilter$.subscribe(doClear => {
      this.clearAction$.next(doClear);
    });
  }

  setOrderFilter$(stream) {
    this.orderFilter$ = stream;
  }

  setMediaTypeFilter$(stream) {
    this.mediaTypeFilter$ = stream;
  }

  subscribeClearAction() {
    return this.clearAction$;
  }

  filterData(dataStream: Observable<MediaModel[]>) {
    return this.filterBySort(this.filterByMediaType(this.filterByLiveSearch(dataStream)));
  }

  private filterByLiveSearch(dataStream: Observable<MediaModel[]>) {
    return combineLatest(dataStream, this.liveSearchFilter$).pipe(
      map(([mediaCollection, liveSearchString]) =>
        mediaCollection.filter(media => liveSearchString === '' || media.title.toLowerCase().indexOf(liveSearchString.toLowerCase()) !== -1)
      ));
  }

  private filterByMediaType(dataStream: Observable<MediaModel[]>) {
    return combineLatest(dataStream, this.mediaTypeFilter$).pipe(
      map(([mediaCollection, mediaFilter]) =>
        mediaCollection.filter(media => mediaFilter.length === 0 || mediaFilter.includes(media.type)))
    );
  }

  private filterBySort(dataStream: Observable<MediaModel[]>) {
    return combineLatest(dataStream, this.orderFilter$).pipe(
      map(([mediaCollection, order]) => {
        if (order === 1) {
          return [...mediaCollection].sort((a, b) => this.sortFunction(a, b));
        }
        if (order === -1) {
          return [...mediaCollection].sort((a, b) => this.sortFunction(a, b)).reverse();
        }
        return mediaCollection;
      }
      ));
  }

  private sortFunction(a, b) {
    return (a.title > b.title) ? 1 : -1;
  }
}
