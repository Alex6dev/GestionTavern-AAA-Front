import { TestBed } from '@angular/core/testing';

import { InventoryManagerService } from './inventory-manager.service';

describe('InventoryManagerService', () => {
  let service: InventoryManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
