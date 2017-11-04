import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsImageCropperDialogComponent } from './goods-image-cropper-dialog.component';

describe('GoodsImageCropperDialogComponent', () => {
  let component: GoodsImageCropperDialogComponent;
  let fixture: ComponentFixture<GoodsImageCropperDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsImageCropperDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsImageCropperDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
