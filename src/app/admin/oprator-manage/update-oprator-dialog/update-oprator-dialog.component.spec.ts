import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOpratorDialogComponent } from './update-oprator-dialog.component';

describe('UpdateOpratorDialogComponent', () => {
  let component: UpdateOpratorDialogComponent;
  let fixture: ComponentFixture<UpdateOpratorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateOpratorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOpratorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
