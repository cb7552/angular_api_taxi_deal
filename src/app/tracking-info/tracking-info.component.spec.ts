import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingInfoComponent } from './tracking-info.component';

describe('TrackingInfoComponent', () => {
  let component: TrackingInfoComponent;
  let fixture: ComponentFixture<TrackingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
