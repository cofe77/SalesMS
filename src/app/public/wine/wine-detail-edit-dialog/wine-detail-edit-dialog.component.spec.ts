import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WineDetailEditDialogComponent } from './wine-detail-edit-dialog.component';

describe('WineDetailEditDialogComponent', () => {
  let component: WineDetailEditDialogComponent;
  let fixture: ComponentFixture<WineDetailEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WineDetailEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineDetailEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
