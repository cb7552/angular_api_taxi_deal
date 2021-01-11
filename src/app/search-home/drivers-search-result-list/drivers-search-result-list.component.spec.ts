import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverSearchResultComponent } from './drivers-search-result-list.component';

describe('DriverSearchResultComponent', () => {
  let component: DriverSearchResultComponent;
  let fixture: ComponentFixture<DriverSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverSearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
