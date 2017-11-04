import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSavedBeersQRCodeComponent } from './show-saved-beers-qrcode.component';

describe('ShowSavedBeersQRCodeComponent', () => {
  let component: ShowSavedBeersQRCodeComponent;
  let fixture: ComponentFixture<ShowSavedBeersQRCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSavedBeersQRCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSavedBeersQRCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
