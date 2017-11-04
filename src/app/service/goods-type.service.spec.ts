import { TestBed, inject } from '@angular/core/testing';

import { GoodsTypeService } from './goods-type.service';

describe('GoodsTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoodsTypeService]
    });
  });

  it('should be created', inject([GoodsTypeService], (service: GoodsTypeService) => {
    expect(service).toBeTruthy();
  }));
});
