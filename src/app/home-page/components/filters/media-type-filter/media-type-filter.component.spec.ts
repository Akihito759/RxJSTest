import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaTypeFilterComponent } from './media-type-filter.component';

describe('MediaTypeFilterComponent', () => {
  let component: MediaTypeFilterComponent;
  let fixture: ComponentFixture<MediaTypeFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaTypeFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaTypeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
