import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VipChargeDialogComponent } from './vip-charge-dialog.component';

describe('VipChargeDialogComponent', () => {
  let component: VipChargeDialogComponent;
  let fixture: ComponentFixture<VipChargeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VipChargeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VipChargeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
