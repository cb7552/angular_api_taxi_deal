import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineBookSmsComponent } from './offline-book-sms.component';

describe('OfflineBookSmsComponent', () => {
  let component: OfflineBookSmsComponent;
  let fixture: ComponentFixture<OfflineBookSmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfflineBookSmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineBookSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
