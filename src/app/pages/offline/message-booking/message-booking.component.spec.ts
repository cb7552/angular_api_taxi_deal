import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBookingComponent } from './message-booking.component';

describe('MessageBookingComponent', () => {
  let component: MessageBookingComponent;
  let fixture: ComponentFixture<MessageBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
