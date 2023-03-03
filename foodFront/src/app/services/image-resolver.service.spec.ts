import { TestBed } from '@angular/core/testing';

import { ImageResolverService } from './image-resolver.service';

describe('ImageResolverService', () => {
  let service: ImageResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
