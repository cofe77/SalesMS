import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VIPManageComponent } from './vip-manage.component';

describe('VIPManageComponent', () => {
  let component: VIPManageComponent;
  let fixture: ComponentFixture<VIPManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VIPManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VIPManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
