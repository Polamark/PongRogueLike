import { TestBed } from '@angular/core/testing';

import { GameLoopHandler } from './game-loop-handler';

describe('GameLoopHandler', () => {
  let service: GameLoopHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameLoopHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
