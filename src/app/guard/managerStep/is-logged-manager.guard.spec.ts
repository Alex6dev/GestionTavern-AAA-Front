import { TestBed } from '@angular/core/testing';

import { IsLoggedManagerGuard } from './is-logged-manager.guard';

describe('IsLoggedManagerGuard', () => {
  let guard: IsLoggedManagerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsLoggedManagerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
