import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseFilter } from '../base-filter';
import { FilterService } from 'src/app/home-page/services/filter.service';
import { eMediaType } from 'src/app/home-page/models/media-model';
import { BehaviorSubject } from 'rxjs';

export class MediaFilterType {
  title: string;
  value: eMediaType;
  isSelected: boolean;
}

@Component({
  selector: 'app-media-type-filter',
  templateUrl: './media-type-filter.component.html',
  styleUrls: ['./media-type-filter.component.less']
})
export class MediaTypeFilterComponent extends BaseFilter implements OnInit, OnDestroy {
  mediaTypes = this.getMediaTypes();
  private mediaTypesFilter$ = new BehaviorSubject<eMediaType[]>([]);

  constructor(filterService: FilterService) {
    super(filterService);
    filterService.setMediaTypeFilter$(this.mediaTypesFilter$);
  }

  ngOnInit() {
  }

  onMediaTypesChanged(enumValue: eMediaType) {
    const media = this.mediaTypes.find(x => x.value === enumValue);
    media.isSelected = !media.isSelected;
    const filterdArray = this.mediaTypes.filter(x => x.isSelected === true).map(x => x.value);
    this.mediaTypesFilter$.next(filterdArray);
  }

  clear() {
    this.mediaTypes.forEach(media => media.isSelected = false);
    this.mediaTypesFilter$.next([]);
  }

  trackByIsSelected(mediaFilter: MediaFilterType) {
    return mediaFilter.isSelected;
  }

  ngOnDestroy() {
    this.mediaTypesFilter$.unsubscribe();
  }

  private getMediaTypes(): MediaFilterType[] {
    const mediaTypes = [];
    Object.values(eMediaType).forEach(x =>
      mediaTypes.push({
        isSelected: false,
        title: x,
        value: x
      }));
    return mediaTypes;
  }

}
