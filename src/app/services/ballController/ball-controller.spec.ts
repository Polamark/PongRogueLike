import { TestBed } from '@angular/core/testing';

import { BallController } from './ball-controller';

describe('BallController', () => {
  let service: BallController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BallController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
