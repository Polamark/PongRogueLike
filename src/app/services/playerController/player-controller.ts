import {Injectable, signal} from '@angular/core';
import {Observable} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';
import {GameLoopHandler} from '../gameLoopHandler/game-loop-handler';
import {CollisionHandler} from '../collisionHandler/collision-handler';

@Injectable({
  providedIn: 'root'
})
export class PlayerController {
  private playerObject = new playerObject()
  private playerCollisionID: string

  constructor(
    gameLoopHandler: GameLoopHandler,
    collisionHandler: CollisionHandler,
  ) {
    this.playerCollisionID = collisionHandler.createCollisionRecord(this.getCenteredPlayerPosition(), window.innerHeight * 19 / 20, this.playerObject.playerSize(), this.playerObject.playerHeight(), this.playerObject, collisionHandler.getGameObjectTypes().player, collisionHandler.getRenderTypes().rectangle)
    gameLoopHandler.getGameUpdate().subscribe(() => {
      if (Math.abs(this.playerObject.desiredPosition() - this.playerObject.playerPosition()) > 10) {
        if (this.playerObject.desiredPosition() < this.playerObject.playerPosition()) {
          this.changePlayerPosition(Math.round((this.playerObject.playerPosition() - this.playerObject.playerSpeed() * gameLoopHandler.getDelta()())))
        } else if (this.playerObject.desiredPosition() > this.playerObject.playerPosition()) {
          this.changePlayerPosition(Math.round(this.playerObject.playerPosition() + this.playerObject.playerSpeed() * gameLoopHandler.getDelta()()))
        }
      }
      collisionHandler.updateCollisionRecord(this.playerCollisionID, this.getCenteredPlayerPosition(), window.innerHeight * 19 / 20, this.playerObject.playerSize(), this.playerObject.playerHeight())
    })

  }

  changePlayerPosition(x: number) {
    this.playerObject.playerPosition.set(x)
  }

  getPlayerPosition() {
    return this.playerObject.playerPosition
  }

  getCenteredPlayerPosition() {
    return this.playerObject.playerPosition() - this.playerObject.playerSize() / 2
  }

  changeDesiredPosition(x: number) {
    this.playerObject.desiredPosition.set(x)
  }

  getDesiredPosition() {
    return this.playerObject.desiredPosition
  }

  changePlayerSpeed(speed: number) {
    this.playerObject.playerSpeed.set(speed)
  }

  getPlayerSpeed() {
    return this.playerObject.playerSpeed
  }

  changePlayerSize(size: number) {
    this.playerObject.playerSize.set(size)
  }

  getPlayerSize() {
    return this.playerObject.playerSize
  }

  getPlayerHeight() {
    return this.playerObject.playerHeight
  }
}

class playerObject {
  public playerPosition = signal<number>(0) //Where the player is
  public desiredPosition = signal<number>(0) //Where the player wants to be
  public playerSpeed = signal<number>(0.5)
  public playerSize = signal<number>(170)
  public playerHeight = signal<number>(15)
}
