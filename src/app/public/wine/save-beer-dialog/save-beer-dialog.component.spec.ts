import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveBeerDialogComponent } from './save-beer-dialog.component';

describe('SaveBeerDialogComponent', () => {
  let component: SaveBeerDialogComponent;
  let fixture: ComponentFixture<SaveBeerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveBeerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveBeerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
