import { TestBed } from '@angular/core/testing';

import { RecipeCustomerService } from './recipe-customer.service';

describe('RecipeCustomerService', () => {
  let service: RecipeCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
