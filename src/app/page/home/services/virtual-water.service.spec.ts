import { TestBed } from '@angular/core/testing';

import { VirtualWaterCalculatorService } from './virtual-water-calculator.service';

describe('VirtualWaterService', () => {
  let service: VirtualWaterCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirtualWaterCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
