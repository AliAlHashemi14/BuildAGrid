import { TestBed } from '@angular/core/testing';

import { EiaServiceService } from './eia-service.service';

describe('EiaServiceService', () => {
  let service: EiaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EiaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
