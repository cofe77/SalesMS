import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVipDialogComponent } from './update-vip-dialog.component';

describe('UpdateVipDialogComponent', () => {
  let component: UpdateVipDialogComponent;
  let fixture: ComponentFixture<UpdateVipDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateVipDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
