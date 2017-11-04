import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGoodsTypeComponent } from './add-goods-type.component';

describe('AddGoodsTypeComponent', () => {
  let component: AddGoodsTypeComponent;
  let fixture: ComponentFixture<AddGoodsTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGoodsTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGoodsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
