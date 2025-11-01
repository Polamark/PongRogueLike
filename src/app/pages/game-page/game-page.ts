import {ChangeDetectorRef, Component, ElementRef, ViewChild, viewChild} from '@angular/core';
import {PlayerController} from '../../services/playerController/player-controller';
import {BallController} from '../../services/ballController/ball-controller';
import {GameLoopHandler} from '../../services/gameLoopHandler/game-loop-handler';
import {CollisionHandler} from '../../services/collisionHandler/collision-handler';
import {BlockController} from '../../services/blockController/block-controller';
import {GameOrchestrator} from '../../services/gameOrchestrator/game-orchestrator';

@Component({
  selector: 'app-game-page',
  imports: [],
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
    public blockController: BlockController,
    public gameLoopHandler: GameLoopHandler,
    public collisionHandler: CollisionHandler,
    public gameOrchestrator: GameOrchestrator,
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
      this.ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
      this.ctx.fillStyle = 'white'
      this.ctx.fillRect(this.playerController.getPlayerPosition()() - this.playerController.getPlayerSize()() / 2, window.innerHeight * 19 / 20, this.playerController.getPlayerSize()(), this.playerController.getPlayerHeight()())

      for (let block of this.blockController.getBlocks()) {
        this.ctx.fillStyle = block.getColor()
        this.ctx.fillRect(block.getPositions().x, block.getPositions().y, block.getSize().x, block.getSize().y)
        this.ctx.closePath()
      }

      for (let ball of this.ballController.getBalls()) {
        this.ctx.beginPath()
        this.ctx.fillStyle = ball.getColor()
        this.ctx.arc(ball.getPositions().x, ball.getPositions().y, ball.getSize(), 0, 2 * Math.PI)
        this.ctx.fill()
        this.ctx.closePath()
      }
    }
    requestAnimationFrame(this.renderScene)
  }


  ngAfterViewInit() {
    for (let i = 0; i < 0; i++) {
      this.ballController.createBall(Math.random() * window.innerWidth, Math.random() * (window.innerHeight * 10 / 20), 10, 0.25, 'red', 1)
      this.ballController.createBall(Math.random() * window.innerWidth, Math.random() * (window.innerHeight * 10 / 20), 10, 0.25, 'blue', 1)
      this.ballController.createBall(Math.random() * window.innerWidth, Math.random() * (window.innerHeight * 10 / 20), 10, 0.25, 'green', 1)
      this.ballController.createBall(Math.random() * window.innerWidth, Math.random() * (window.innerHeight * 10 / 20), 10, 0.25, 'cyan', 1)
      this.ballController.createBall(Math.random() * window.innerWidth, Math.random() * (window.innerHeight * 10 / 20), 10, 0.25, 'yellow', 1)
      this.ballController.createBall(Math.random() * window.innerWidth, Math.random() * (window.innerHeight * 10 / 20), 10, 0.25, 'orange', 1)
      this.ballController.createBall(Math.random() * window.innerWidth, Math.random() * (window.innerHeight * 10 / 20), 10, 0.25, 'white', 1)
      this.ballController.createBall(Math.random() * window.innerWidth, Math.random() * (window.innerHeight * 10 / 20), 10, 0.25, 'gray',1 )
      this.ballController.createBall(Math.random() * window.innerWidth, Math.random() * (window.innerHeight * 10 / 20), 10, 0.25, 'purple', 1)
      this.ballController.createBall(Math.random() * window.innerWidth, Math.random() * (window.innerHeight * 10 / 20), 10, 0.25, 'pink',1)
    }

    //this.blockController.createBlock(100, 100, 100, 25, '#003764')
    this.ballController.createBall(window.innerWidth / 2, window.innerHeight * 18 / 20, 8, 0.3, 'gold', 10, 2)
    this.blockController.createBlockGrid(13, 10, 20, 'blue')
    requestAnimationFrame(this.renderScene)
    let left = this.collisionHandler.createCollisionRecord(-300, -300, 300, window.innerHeight + 600, null, this.collisionHandler.getGameObjectTypes().wall, this.collisionHandler.getRenderTypes().rectangle, false)
    let right = this.collisionHandler.createCollisionRecord(window.innerWidth, -300, 300, window.innerHeight + 600, null, this.collisionHandler.getGameObjectTypes().wall, this.collisionHandler.getRenderTypes().rectangle, false)
    let top = this.collisionHandler.createCollisionRecord(-300, -300, window.innerWidth + 600, 300, null, this.collisionHandler.getGameObjectTypes().wall, this.collisionHandler.getRenderTypes().rectangle, false)
    let bottom = this.collisionHandler.createCollisionRecord(-300, window.innerHeight, window.innerWidth + 600, 300, null, this.collisionHandler.getGameObjectTypes().wall, this.collisionHandler.getRenderTypes().rectangle, false)
    window.onresize = () => {
      this.collisionHandler.updateCollisionRecord(left, -300, -300, 300, window.innerHeight + 600)
      this.collisionHandler.updateCollisionRecord(right, window.innerWidth, -300, 300, window.innerHeight + 600)
      this.collisionHandler.updateCollisionRecord(top, -300, -300, window.innerWidth + 600, 300)
      this.collisionHandler.updateCollisionRecord(bottom, -300, window.innerHeight, window.innerWidth + 600, 300)
    }
    this.cd.detectChanges()
  }

  protected readonly Math = Math;
}
