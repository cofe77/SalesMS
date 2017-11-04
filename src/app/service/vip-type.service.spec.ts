import { TestBed, inject } from '@angular/core/testing';

import { VipTypeService } from './vip-type.service';

describe('VipTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VipTypeService]
    });
  });

  it('should be created', inject([VipTypeService], (service: VipTypeService) => {
    expect(service).toBeTruthy();
  }));
});
