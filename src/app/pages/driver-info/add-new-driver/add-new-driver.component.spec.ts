import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewDriverComponent } from './add-new-driver.component';

describe('AddNewDriverComponent', () => {
  let component: AddNewDriverComponent;
  let fixture: ComponentFixture<AddNewDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
