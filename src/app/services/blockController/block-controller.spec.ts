import { TestBed } from '@angular/core/testing';

import { BlockHandler } from './block-controller';

describe('BlockHandler', () => {
  let service: BlockHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
