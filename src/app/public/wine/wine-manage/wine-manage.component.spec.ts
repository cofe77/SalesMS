import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WineManageComponent } from './wine-manage.component';

describe('WineManageComponent', () => {
  let component: WineManageComponent;
  let fixture: ComponentFixture<WineManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WineManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
