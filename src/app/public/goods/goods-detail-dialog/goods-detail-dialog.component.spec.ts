import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsDetailDialogComponent } from './goods-detail-dialog.component';

describe('GoodsDetailDialogComponent', () => {
  let component: GoodsDetailDialogComponent;
  let fixture: ComponentFixture<GoodsDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
