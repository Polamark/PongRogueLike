import { TestBed } from '@angular/core/testing';

import { GameOrchestrator } from './game-orchestrator';

describe('GameOrchestrator', () => {
  let service: GameOrchestrator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameOrchestrator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
