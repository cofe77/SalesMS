import { TestBed, inject } from '@angular/core/testing';

import { LotteryLevelService } from './lottery-level.service';

describe('LotteryLevelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LotteryLevelService]
    });
  });

  it('should be created', inject([LotteryLevelService], (service: LotteryLevelService) => {
    expect(service).toBeTruthy();
  }));
});
