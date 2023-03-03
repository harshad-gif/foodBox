import { TestBed } from '@angular/core/testing';

import { FoodResolverService } from './food-resolver.service';

describe('FoodResolverService', () => {
  let service: FoodResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
