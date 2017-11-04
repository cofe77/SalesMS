import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VipTypeManageComponent } from './vip-type-manage.component';

describe('VipTypeManageComponent', () => {
  let component: VipTypeManageComponent;
  let fixture: ComponentFixture<VipTypeManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VipTypeManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VipTypeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
