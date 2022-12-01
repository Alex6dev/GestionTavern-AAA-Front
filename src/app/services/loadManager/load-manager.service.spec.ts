import { TestBed } from '@angular/core/testing';

import { LoadManagerService } from './load-manager.service';

describe('LoadManagerService', () => {
  let service: LoadManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
