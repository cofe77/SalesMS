import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryDetailDialogComponent } from './lottery-detail-dialog.component';

describe('LotteryDetailDialogComponent', () => {
  let component: LotteryDetailDialogComponent;
  let fixture: ComponentFixture<LotteryDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotteryDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
