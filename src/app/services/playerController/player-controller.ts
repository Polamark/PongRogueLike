import {Injectable, signal} from '@angular/core';
import {Observable} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';
import {GameLoopHandler} from '../gameLoopHandler/game-loop-handler';

@Injectable({
  providedIn: 'root'
})
export class PlayerController {
  private playerPosition = signal<number>(0) //Where the player is
  private desiredPosition = signal<number>(0) //Where the player wants to be
  private playerSpeed = 0.5
  private playerSize = 100

  constructor(
    gameLoopHandler: GameLoopHandler,
  ) {
    gameLoopHandler.getGameUpdate().subscribe(() => {
      if (Math.abs(this.desiredPosition() - this.playerPosition()) > 10) {
        if (this.desiredPosition() < this.playerPosition()) {
          this.changePlayerPosition(Math.round((this.playerPosition() - this.playerSpeed * gameLoopHandler.getDelta()())))
        } else if (this.desiredPosition() > this.playerPosition()) {
          this.changePlayerPosition(Math.round(this.playerPosition() + this.playerSpeed * gameLoopHandler.getDelta()()))
        }
      }
    })
  }

  changePlayerPosition(x: number) {
    this.playerPosition.set(x)
  }

  getPlayerPosition() {
    return this.playerPosition
  }

  changeDesiredPosition(x: number) {
    this.desiredPosition.set(x)
  }

  getDesiredPosition() {
    return this.desiredPosition
  }

  changePlayerSpeed(speed: number) {
    this.playerSpeed = speed
  }

  getPlayerSpeed() {
    return this.playerSpeed
  }

  changePlayerSize(size: number) {
    this.playerSize = size
  }


  getPlayerSize() {
    return this.playerSize
  }
}
