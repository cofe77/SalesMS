import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLotteryLevelDialogComponent } from './update-lottery-level-dialog.component';

describe('UpdateLotteryLevelDialogComponent', () => {
  let component: UpdateLotteryLevelDialogComponent;
  let fixture: ComponentFixture<UpdateLotteryLevelDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateLotteryLevelDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLotteryLevelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
