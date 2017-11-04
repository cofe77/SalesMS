import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuForAdminComponent } from './menu-for-admin.component';

describe('MenuForAdminComponent', () => {
  let component: MenuForAdminComponent;
  let fixture: ComponentFixture<MenuForAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuForAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
