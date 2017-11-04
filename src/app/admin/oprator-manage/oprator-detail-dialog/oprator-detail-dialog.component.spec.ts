import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpratorDetailDialogComponent } from './oprator-detail-dialog.component';

describe('OpratorDetailDialogComponent', () => {
  let component: OpratorDetailDialogComponent;
  let fixture: ComponentFixture<OpratorDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpratorDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpratorDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
