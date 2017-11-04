import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSavedBeerComponent } from './select-saved-beer.component';

describe('SelectSavedBeerComponent', () => {
  let component: SelectSavedBeerComponent;
  let fixture: ComponentFixture<SelectSavedBeerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSavedBeerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSavedBeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
