import { TestBed, inject } from '@angular/core/testing';

import { DeskTypesService } from './desk-types.service';

describe('DeskTypesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeskTypesService]
    });
  });

  it('should be created', inject([DeskTypesService], (service: DeskTypesService) => {
    expect(service).toBeTruthy();
  }));
});
