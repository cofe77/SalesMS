import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVipTypeComponent } from './add-vip-type.component';

describe('AddVipTypeComponent', () => {
  let component: AddVipTypeComponent;
  let fixture: ComponentFixture<AddVipTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVipTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVipTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
