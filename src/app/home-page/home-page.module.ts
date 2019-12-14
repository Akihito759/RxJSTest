import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveSearchComponent } from './components/filters/live-search/live-search.component';
import { MediaTypeFilterComponent } from './components/filters/media-type-filter/media-type-filter.component';
import { OrderFilterComponent } from './components/filters/order-filter/order-filter.component';
import { ClearFilterComponent } from './components/filters/clear-filter/clear-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FiltersPanelComponent } from './components/filters-panel/filters-panel.component';





@NgModule({
  declarations: [LiveSearchComponent, MediaTypeFilterComponent, OrderFilterComponent, ClearFilterComponent, HomepageComponent, FiltersPanelComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
  ]
})
export class HomePageModule { }
