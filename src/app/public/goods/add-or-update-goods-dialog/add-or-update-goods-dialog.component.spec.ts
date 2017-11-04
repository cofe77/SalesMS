import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateGoodsDialogComponent } from './add-or-update-goods-dialog.component';

describe('AddOrUpdateGoodsDialogComponent', () => {
  let component: AddOrUpdateGoodsDialogComponent;
  let fixture: ComponentFixture<AddOrUpdateGoodsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdateGoodsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateGoodsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
