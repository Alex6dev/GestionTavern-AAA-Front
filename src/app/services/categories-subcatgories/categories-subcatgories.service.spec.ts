import { TestBed } from '@angular/core/testing';

import { CategoriesSubcatgoriesService } from './categories-subcatgories.service';

describe('CategoriesSubcatgoriesService', () => {
  let service: CategoriesSubcatgoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesSubcatgoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
