import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RideCalculationComponent } from './ride-calculation.component';

describe('RideCalculationComponent', () => {
  let component: RideCalculationComponent;
  let fixture: ComponentFixture<RideCalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RideCalculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RideCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
