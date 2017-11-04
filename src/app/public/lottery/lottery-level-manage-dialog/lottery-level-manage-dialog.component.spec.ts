import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryLevelManageDialogComponent } from './lottery-level-manage-dialog.component';

describe('LotteryLevelManageDialogComponent', () => {
  let component: LotteryLevelManageDialogComponent;
  let fixture: ComponentFixture<LotteryLevelManageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotteryLevelManageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryLevelManageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
