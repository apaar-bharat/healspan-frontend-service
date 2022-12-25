import { TestBed } from '@angular/core/testing';

import { ModalpopupService } from './modalpopup.service';

describe('ModalpopupService', () => {
  let service: ModalpopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalpopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
