import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WineDetailDialogComponent } from './wine-detail-dialog.component';

describe('WineDetailDialogComponent', () => {
  let component: WineDetailDialogComponent;
  let fixture: ComponentFixture<WineDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WineDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
