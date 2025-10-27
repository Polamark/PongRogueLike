import { TestBed } from '@angular/core/testing';

import { CollisionHandler } from './collision-handler';

describe('CollisionHandler', () => {
  let service: CollisionHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollisionHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
