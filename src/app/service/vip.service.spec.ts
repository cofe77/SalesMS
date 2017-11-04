import { TestBed, inject } from '@angular/core/testing';

import { VipService } from './vip.service';

describe('VipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VipService]
    });
  });

  it('should be created', inject([VipService], (service: VipService) => {
    expect(service).toBeTruthy();
  }));
});
