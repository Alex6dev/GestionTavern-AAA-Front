import { TestBed } from '@angular/core/testing';

import { CustomerManagementService } from './customer-management.service';

describe('CustomerManagerService', () => {
  let service: CustomerManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
