import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverStatusComponent } from './driver-status.component';

describe('DriverStatusComponent', () => {
  let component: DriverStatusComponent;
  let fixture: ComponentFixture<DriverStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
