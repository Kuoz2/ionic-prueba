import { TestBed } from '@angular/core/testing';

import { HoraActualService } from './hora-actual.service';

describe('HoraActualService', () => {
  let service: HoraActualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoraActualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
