import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCarDetailsComponent } from './search-car-details.component';

describe('SearchCarDetailsComponent', () => {
  let component: SearchCarDetailsComponent;
  let fixture: ComponentFixture<SearchCarDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCarDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
