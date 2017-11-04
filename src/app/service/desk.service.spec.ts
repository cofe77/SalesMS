import { TestBed, inject } from '@angular/core/testing';

import { DeskService } from './desk.service';

describe('DeskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeskService]
    });
  });

  it('should be created', inject([DeskService], (service: DeskService) => {
    expect(service).toBeTruthy();
  }));
});
