import { TestBed } from '@angular/core/testing';

import { PlayerController } from './player-controller';

describe('PlayerController', () => {
  let service: PlayerController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
