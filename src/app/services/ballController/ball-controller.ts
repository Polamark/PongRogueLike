import { Injectable } from '@angular/core';
import {GameLoopHandler} from '../gameLoopHandler/game-loop-handler';

@Injectable({
  providedIn: 'root'
})
export class BallController {
  private balls: Ball[] = []

  constructor(
    gameLoopHandler: GameLoopHandler,
  ) {
    gameLoopHandler.getGameUpdate().subscribe(()=> {
      for (let ball of this.balls) {
        ball.setPositions(ball.getPositions().x + ball.getDirections().x * ball.getSpeed() * gameLoopHandler.getDelta()(), ball.getPositions().y + ball.getDirections().y * ball.getSpeed() * gameLoopHandler.getDelta()())
      }
    })
  }

  createBall = (size: number, speed: number, color: string, positionX: number = 100, positionY: number = 100) => {
    this.balls.push(new Ball(size, speed, color, positionX, positionY))
  }

  getBalls() {
    return this.balls
  }
}

class Ball {
  private size: number = 25;
  private speed: number = 10;
  private color: string = 'red';

  private positionX: number = 100;
  private positionY: number = 100;

  private directionX: number = 1;
  private directionY: number = 1;

  constructor(size: number, speed: number, color: string, positionX: number = 100, positionY: number = 100) {
    if (size < 0) {
      console.error('A ball has been created with a negative size.');
    } else {
      this.size = size;
    }
    this.speed = speed;
    this.color = color;
    this.positionX = positionX;
    this.positionY = positionY;
  }

  setSize(size: number) {
    this.size = size;
  }

  getSize() {
    return this.size;
  }

  setSpeed(speed: number) {
    this.speed = speed;
  }

  getSpeed() {
    return this.speed;
  }

  setColor(color: string) {
    this.color = color;
  }

  getColor() {
    return this.color;
  }

  setDirections(x: number, y: number) {
    this.directionX = x;
    this.directionY = y;
  }

  getDirections() {
    return {
      x: this.directionX,
      y: this.directionY
    };
  }

  setPositions(x: number, y: number) {
    this.positionX = x;
    this.positionY = y;
  }

  getPositions() {
    return {
      x: this.positionX,
      y: this.positionY
    };
  }
}
