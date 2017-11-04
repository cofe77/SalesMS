import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeskDialogComponent } from './update-desk-dialog.component';

describe('UpdateDeskDialogComponent', () => {
  let component: UpdateDeskDialogComponent;
  let fixture: ComponentFixture<UpdateDeskDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDeskDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDeskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
