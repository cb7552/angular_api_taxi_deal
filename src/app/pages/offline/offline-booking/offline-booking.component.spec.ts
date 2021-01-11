import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineBookingComponent } from './offline-booking.component';

describe('OfflineBookingComponent', () => {
  let component: OfflineBookingComponent;
  let fixture: ComponentFixture<OfflineBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfflineBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
