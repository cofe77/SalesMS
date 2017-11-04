import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpratorManageComponent } from './oprator-manage.component';

describe('OpratorManageComponent', () => {
  let component: OpratorManageComponent;
  let fixture: ComponentFixture<OpratorManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpratorManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpratorManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
