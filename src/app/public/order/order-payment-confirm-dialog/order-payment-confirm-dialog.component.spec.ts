import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPaymentConfirmDialogComponent } from './order-payment-confirm-dialog.component';

describe('OrderPaymentConfirmDialogComponent', () => {
  let component: OrderPaymentConfirmDialogComponent;
  let fixture: ComponentFixture<OrderPaymentConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPaymentConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPaymentConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
