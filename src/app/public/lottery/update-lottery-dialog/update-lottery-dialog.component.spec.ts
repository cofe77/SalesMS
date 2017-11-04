import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLotteryDialogComponent } from './update-lottery-dialog.component';

describe('UpdateLotteryDialogComponent', () => {
  let component: UpdateLotteryDialogComponent;
  let fixture: ComponentFixture<UpdateLotteryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateLotteryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLotteryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
