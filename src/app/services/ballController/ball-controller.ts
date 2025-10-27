import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BallController {
  private ballSpeed = 4
  private ballSize = 25

  getBallSpeed() {
    return this.ballSpeed
  }

  getBallSize() {
    return this.ballSize
  }
}
