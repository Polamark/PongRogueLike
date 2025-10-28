import {Injectable, signal} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class GameLoopHandler {
  private delta = signal<number>(0)
  private gameRunning = signal<boolean>(true)
  private gameUpdate = signal<number>(0)
  private gameUpdate$ = toObservable(this.gameUpdate)



  setDelta(delta: number) {
    this.delta.set(delta)
  }

  setGameRunning(gameRunning: boolean) {
    this.gameRunning.set(gameRunning)
  }

  getDelta() {
    return this.delta
  }

  getGameRunning() {
    return this.gameRunning
  }

  updateGame() {
    this.gameUpdate.update(x => x + 1)
  }

  getGameUpdate() {
    return this.gameUpdate$
  }
}
