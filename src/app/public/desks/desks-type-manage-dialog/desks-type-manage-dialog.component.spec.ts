import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesksTypeManageDialogComponent } from './desks-type-manage-dialog.component';

describe('DesksTypeManageDialogComponent', () => {
  let component: DesksTypeManageDialogComponent;
  let fixture: ComponentFixture<DesksTypeManageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesksTypeManageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesksTypeManageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
