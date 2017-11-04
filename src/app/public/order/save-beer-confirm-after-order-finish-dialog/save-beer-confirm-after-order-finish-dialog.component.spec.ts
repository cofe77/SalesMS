import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveBeerConfirmAfterOrderFinishDialogComponent } from './save-beer-confirm-after-order-finish-dialog.component';

describe('SaveBeerConfirmAfterOrderFinishDialogComponent', () => {
  let component: SaveBeerConfirmAfterOrderFinishDialogComponent;
  let fixture: ComponentFixture<SaveBeerConfirmAfterOrderFinishDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveBeerConfirmAfterOrderFinishDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveBeerConfirmAfterOrderFinishDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
