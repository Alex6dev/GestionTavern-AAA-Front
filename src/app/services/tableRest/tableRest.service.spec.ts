import { TestBed } from '@angular/core/testing';

import { TableRestService } from './tableRest.service';

describe('TableService', () => {
  let service: TableRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
