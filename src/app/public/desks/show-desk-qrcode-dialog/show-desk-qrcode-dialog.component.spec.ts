import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDeskQRCodeDialogComponent } from './show-desk-qrcode-dialog.component';

describe('ShowDeskQRCodeDialogComponent', () => {
  let component: ShowDeskQRCodeDialogComponent;
  let fixture: ComponentFixture<ShowDeskQRCodeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDeskQRCodeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDeskQRCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
