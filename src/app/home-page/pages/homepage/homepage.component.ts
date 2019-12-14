import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaModel } from '../../models/media-model';
import { DataService } from '../../services/data.service';
import { FilterService } from '../../services/filter.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.less']
})
export class HomepageComponent implements OnInit {
  filtredMedia: Observable<MediaModel[]>;
  _DataService: DataService;
  _FilterService: FilterService;
  constructor(dataService: DataService, filterService: FilterService) {
    this._DataService = dataService;
    this._FilterService = filterService;
  }

  ngOnInit() {
    this.filtredMedia = this._FilterService.filterData(this._DataService.getData());
  }

}
