import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFinishConfirmDialogComponent } from './order-finish-confirm-dialog.component';

describe('OrderFinishConfirmDialogComponent', () => {
  let component: OrderFinishConfirmDialogComponent;
  let fixture: ComponentFixture<OrderFinishConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderFinishConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFinishConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
