import {Injectable} from '@angular/core';
import {GameLoopHandler} from '../gameLoopHandler/game-loop-handler';
import {CollisionHandler} from '../collisionHandler/collision-handler';

@Injectable({
  providedIn: 'root'
})
export class BallController {
  private balls: Ball[] = []

  constructor(
    gameLoopHandler: GameLoopHandler,
    public collisionHandler: CollisionHandler
  ) {
    gameLoopHandler.getGameUpdate().subscribe(() => {
      for (let ball of this.balls) {
        ball.setPositions(ball.getPositions().x + ball.getDirections().x * ball.getSpeed() * gameLoopHandler.getDelta()(), ball.getPositions().y + ball.getDirections().y * ball.getSpeed() * gameLoopHandler.getDelta()())
        collisionHandler.updateCollisionRecord(ball.getCollisionRecordID(), ball.getPositions().x, ball.getPositions().y, ball.getSize(), ball.getSize())
      }
    })
    collisionHandler.getCollisionListener().subscribe(collision => {
      let ball = this.balls.find((x) => {
        return x.getCollisionRecordID() == collision?.sourceID
      })
      if (ball) {
        if (
          collision?.target.getGameObject().objectType == collisionHandler.getGameObjectTypes().player ||
          collision?.target.getGameObject().objectType == collisionHandler.getGameObjectTypes().wall ||
          collision?.target.getGameObject().objectType == collisionHandler.getGameObjectTypes().ball ||
          collision?.target.getGameObject().objectType == collisionHandler.getGameObjectTypes().block) {
          if (collision.sidesCollided.top) {
            ball.setDirections(ball.getDirections().x, 1)
          } else if (collision.sidesCollided.bottom) {
            ball.setDirections(ball.getDirections().x, -1)
          } else if (collision.sidesCollided.left) {
            ball.setDirections(1, ball.getDirections().y)
          } else if (collision.sidesCollided.right) {
            ball.setDirections(-1, ball.getDirections().y)
            console.log(ball.getDirections().x)
          }
        }
      }
    })
  }

  createBall = (positionX: number = 100, positionY: number = 100, size: number, speed: number, color: string) => {
    let ball = new Ball(size, speed, color, "", positionX, positionY)
    const ballCollisionRecordID = this.collisionHandler.createCollisionRecord(positionX, positionY, size, size, ball, this.collisionHandler.getGameObjectTypes().ball, this.collisionHandler.getRenderTypes().circle)
    ball.setCollisionRecordID(ballCollisionRecordID)
    this.balls.push(ball)
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

  private directionX: number = Math.random() > 0.5 ? 1 : -1;
  private directionY: number = -1;

  private collisionRecordID: string = ''

  constructor(size: number, speed: number, color: string, recordID: string, positionX: number = 100, positionY: number = 100) {
    if (size < 0) {
      console.error('A ball has been created with a negative size.');
    } else {
      this.size = size;
    }
    if (color == '') {
      console.error('A ball has been created with an empty color.');
    }
    this.speed = speed;
    this.color = color;
    this.collisionRecordID = recordID
    this.positionX = positionX;
    this.positionY = positionY;
  }

  getCollisionRecordID() {
    return this.collisionRecordID;
  }

  setCollisionRecordID(recordID: string) {
    this.collisionRecordID = recordID;
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
