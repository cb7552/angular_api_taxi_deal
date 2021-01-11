import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverToptupComponent } from './driver-toptup.component';

describe('DriverToptupComponent', () => {
  let component: DriverToptupComponent;
  let fixture: ComponentFixture<DriverToptupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverToptupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverToptupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
