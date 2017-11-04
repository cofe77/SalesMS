import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOrderDialogComponent } from './select-order-dialog.component';

describe('SelectOrderDialogComponent', () => {
  let component: SelectOrderDialogComponent;
  let fixture: ComponentFixture<SelectOrderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectOrderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
