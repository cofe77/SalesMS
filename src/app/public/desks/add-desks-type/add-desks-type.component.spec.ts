import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDesksTypeComponent } from './add-desks-type.component';

describe('AddDesksTypeComponent', () => {
  let component: AddDesksTypeComponent;
  let fixture: ComponentFixture<AddDesksTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDesksTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDesksTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
