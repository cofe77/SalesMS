import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectVipDialogComponent } from './select-vip-dialog.component';

describe('SelectVipDialogComponent', () => {
  let component: SelectVipDialogComponent;
  let fixture: ComponentFixture<SelectVipDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectVipDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectVipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
