import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerController {
  private playerPosition = 0
  private playerSize = 100

  changePlayerPosition(x: number) {
    this.playerPosition = x
  }

  changePlayerSize(size: number) {
    this.playerSize = size
  }

  getPlayerPosition() {
    return this.playerPosition
  }

  getPlayerSize() {
    return this.playerSize
  }
}
