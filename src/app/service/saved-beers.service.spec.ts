import { TestBed, inject } from '@angular/core/testing';

import { SavedBeersService } from './saved-beers.service';

describe('SavedBeersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SavedBeersService]
    });
  });

  it('should be created', inject([SavedBeersService], (service: SavedBeersService) => {
    expect(service).toBeTruthy();
  }));
});
