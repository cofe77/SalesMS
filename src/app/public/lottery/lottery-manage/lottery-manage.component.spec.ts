import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryManageComponent } from './lottery-manage.component';

describe('LotteryManageComponent', () => {
  let component: LotteryManageComponent;
  let fixture: ComponentFixture<LotteryManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotteryManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
