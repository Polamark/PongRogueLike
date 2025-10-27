import { Component } from '@angular/core';
import {BallController} from '../../services/ballController/ball-controller';

@Component({
  selector: 'app-ball',
  imports: [],
  templateUrl: './ball.html',
  styleUrl: './ball.css',
})
export class Ball {
  ballPosition = {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight / 4,
    directionX: Math.random() > 0.5 ? 1 : -1,
    directionY: Math.random() > 0.5 ? 1 : -1,
  }

  constructor(
    public ballController: BallController,
  ) { }

  wallCollisionDetector = () => {
    if (this.ballPosition.x + this.ballController.getBallSize() > window.innerWidth || this.ballPosition.x < 0) {
      this.ballPosition.directionX *= -1
    } else if (this.ballPosition.y + this.ballController.getBallSize() > window.innerHeight || this.ballPosition.y < 0) {
      this.ballPosition.directionY *= -1
    }
  }

  movementFunc = () => {
    this.wallCollisionDetector()
    this.ballPosition.x += this.ballController.getBallSpeed() * this.ballPosition.directionX
    this.ballPosition.y += this.ballController.getBallSpeed() * this.ballPosition.directionY
    requestAnimationFrame(this.movementFunc)
  }

  ngOnInit() {
    requestAnimationFrame(this.movementFunc)
  }

}
