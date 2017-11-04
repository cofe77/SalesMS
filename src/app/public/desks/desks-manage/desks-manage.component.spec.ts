import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesksManageComponent } from './desks-manage.component';

describe('DesksManageComponent', () => {
  let component: DesksManageComponent;
  let fixture: ComponentFixture<DesksManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesksManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesksManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
