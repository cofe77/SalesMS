import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsTypeManageDialogComponent } from './goods-type-manage-dialog.component';

describe('GoodsTypeManageDialogComponent', () => {
  let component: GoodsTypeManageDialogComponent;
  let fixture: ComponentFixture<GoodsTypeManageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsTypeManageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsTypeManageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
