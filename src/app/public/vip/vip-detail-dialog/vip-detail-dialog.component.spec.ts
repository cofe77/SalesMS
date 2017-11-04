import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VipDetailDialogComponent } from './vip-detail-dialog.component';

describe('VipDetailDialogComponent', () => {
  let component: VipDetailDialogComponent;
  let fixture: ComponentFixture<VipDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VipDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VipDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
