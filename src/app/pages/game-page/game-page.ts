import {ChangeDetectorRef, Component, ElementRef, ViewChild, viewChild} from '@angular/core';
import {PlayerController} from '../../services/playerController/player-controller';
import {BallController} from '../../services/ballController/ball-controller';
import {GameLoopHandler} from '../../services/gameLoopHandler/game-loop-handler';
import {CollisionHandler} from '../../services/collisionHandler/collision-handler';

@Component({
  selector: 'app-game-page',
  imports: [
  ],
  templateUrl: './game-page.html',
  styleUrl: './game-page.css',
})
export class GamePage {
  @ViewChild('gameCanvas') canvas!: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D | null = null;
  private lastTimestamp = 0;

  constructor(
    public playerController: PlayerController,
    public ballController: BallController,
    public gameLoopHandler: GameLoopHandler,
    public collisionHandler: CollisionHandler,
    public cd: ChangeDetectorRef,
  ) {
    document.addEventListener('keydown', (event) => {
      if (event.code == "Space") {
        gameLoopHandler.setGameRunning(!gameLoopHandler.getGameRunning()())
      }
    })
  }

  renderScene = (timestamp: number) => {
    this.gameLoopHandler.setDelta(timestamp - this.lastTimestamp) // delta time
    this.lastTimestamp = timestamp

    if (!this.gameLoopHandler.getGameRunning()()) {
      requestAnimationFrame(this.renderScene)
      return
    }

    this.gameLoopHandler.updateGame()
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement
    canvasEl.width = window.innerWidth
    canvasEl.height = window.innerHeight
    this.ctx = canvasEl.getContext('2d')
    if (this.ctx) {
      this.ctx.fillStyle = 'white'
      this.ctx.fillRect(0, 0, 1, window.innerHeight)
      this.ctx.fillRect(this.playerController.getPlayerPosition()() - this.playerController.getPlayerSize()() / 2, window.innerHeight * 19 / 20, this.playerController.getPlayerSize()(), this.playerController.getPlayerHeight()())

      for (let ball of this.ballController.getBalls()) {
        this.ctx.fillStyle = ball.getColor()
        this.ctx.arc(ball.getPositions().x, ball.getPositions().y, ball.getSize(), 0, 2 * Math.PI)
        this.ctx.fill()
      }
    }
    requestAnimationFrame(this.renderScene)
  }


  ngAfterViewInit() {
    this.ballController.createBall(50, 0.25, 'red')
    requestAnimationFrame(this.renderScene)
    this.collisionHandler.createCollisionRecord(1,0, 1, window.innerHeight, null, this.collisionHandler.getGameObjectTypes().wall, this.collisionHandler.getRenderTypes().rectangle)
    this.collisionHandler.createCollisionRecord(window.innerWidth,1, 1, window.innerHeight, null, this.collisionHandler.getGameObjectTypes().wall, this.collisionHandler.getRenderTypes().rectangle)
    this.collisionHandler.createCollisionRecord(0,0, window.innerWidth, 1, null, this.collisionHandler.getGameObjectTypes().wall, this.collisionHandler.getRenderTypes().rectangle)
    this.cd.detectChanges()
  }
}
