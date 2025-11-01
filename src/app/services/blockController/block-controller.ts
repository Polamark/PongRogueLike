import {Injectable} from '@angular/core';
import {CollisionHandler} from '../collisionHandler/collision-handler';
import {GameOrchestrator} from '../gameOrchestrator/game-orchestrator';

@Injectable({
  providedIn: 'root'
})
export class BlockController {
  private blocks: Block[] = []

  constructor(
    public collisionHandler: CollisionHandler,
    gameOrchestrator: GameOrchestrator,
  ) {
    collisionHandler.getCollisionListener().subscribe(collision => {
      let block = this.blocks.find((x) => {
        return x.getCollisionRecordID() == collision?.targetID
      })
      if (block) {
        if (collision?.source?.getGameObject().objectType == collisionHandler.getGameObjectTypes().ball) {
          const oldHealth = block.getHealth()
          const strength = collision?.source.getGameObject().object.getStrength()
          const newHealth = oldHealth - strength
          block.setHealth(newHealth)
          if (block.getHealth() <= 0) {
            gameOrchestrator.addMoney((strength * block.getPrizeBase() + block.getKillMultiplier()) * collision?.source.getGameObject().object.getMoneyMultiplier())
            this.deleteBlock(block)
          } else {
            gameOrchestrator.addMoney(strength * block.getPrizeBase() * collision?.source.getGameObject().object.getMoneyMultiplier())
          }
        }
      }
    })
  }

  createBlock(positionX: number, positionY: number, sizeX: number, sizeY: number, color: string) {
    let block = new Block(positionX, positionY, sizeX, sizeY, color, "")
    const ballCollisionRecordID = this.collisionHandler.createCollisionRecord(positionX, positionY, sizeX, sizeY, block, this.collisionHandler.getGameObjectTypes().block, this.collisionHandler.getRenderTypes().rectangle, false)
    block.setCollisionRecordID(ballCollisionRecordID)
    this.blocks.push(block)
  }

  createBlockGrid(rows: number, columns: number, gap: number, color: string) {
    const startPosX = window.innerWidth / 20
    const startPosY = window.innerHeight / 20
    const endPosX = window.innerWidth - startPosX
    const endPosY = window.innerHeight - startPosY * 8
    const blockSizeX = (endPosX - gap * (columns - 1) - startPosX) / columns
    const blockSizeY = (endPosY - gap * (rows - 1) - startPosY) / rows

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const blockX = startPosX + blockSizeX * column + gap * column
        const blockY = startPosY + blockSizeY * row + gap * row
        this.createBlock(blockX, blockY, blockSizeX, blockSizeY, color)
      }
    }

  }

  getBlocks() {
    let data: Block[] = []
    for (let block of this.blocks) {
      let correctedSizes = {
        x: block.getSize().x * block.getHealth() / block.getMaxHealth(),
        y: block.getSize().y * block.getHealth() / block.getMaxHealth()
      }
      let copy = new Block(block.getPositions().x + (block.getSize().x - correctedSizes.x) / 2, block.getPositions().y + (block.getSize().y - correctedSizes.y) / 2, correctedSizes.x, correctedSizes.y, block.getColor(), block.getCollisionRecordID(), block.getMaxHealth(), block.getHealth())
      data.push(copy)
    }
    return data
  }

  getRawBlocks() {
    return this.blocks
  }

  deleteBlock(block: Block) {
    this.blocks = this.blocks.filter(x => x !== block)
    this.collisionHandler.removeCollisionRecord(block.getCollisionRecordID())
  }
}

class Block {
  private sizeX: number = 25;
  private sizeY: number = 25;
  private color: string = 'red';

  private maxHealth: number;
  private currentHealth: number;

  private prizeBase: number;
  private killMultiplier: number;

  private positionX: number;
  private positionY: number;

  private collisionRecordID: string = ''

  constructor(
    positionX: number = 100,
    positionY: number = 100,
    sizeX: number,
    sizeY: number,
    color: string,
    recordID: string,
    maxHealth: number = 100,
    health?: number,
    prizeBase: number = 0.1,
    killMultiplier: number = 50,
    ) {
    if (sizeX < 0) {
      console.error('A block has been created with a negative size on the x axis.');
    } else {
      this.sizeX = sizeX;
    }
    if (sizeY < 0) {
      console.error('A block has been created with a negative size on the y axis.');
    } else {
      this.sizeY = sizeY;
    }
    if (color == '') {
      console.error('A block has been created with an empty color.');
    }
    this.color = color;
    this.collisionRecordID = recordID
    this.positionX = positionX;
    this.positionY = positionY;
    this.maxHealth = maxHealth;
    if (health) {
      this.currentHealth = health;
    } else {
      this.currentHealth = maxHealth;
    }
    this.prizeBase = prizeBase;
    this.killMultiplier = killMultiplier;
  }

  getKillMultiplier() {
    return this.killMultiplier;
  }

  getPrizeBase() {
    return this.prizeBase;
  }

  getHealth() {
    return this.currentHealth;
  }

  getMaxHealth() {
    return this.maxHealth;
  }

  setHealth(health: number) {
    this.currentHealth = health;
  }

  setMaxHealth(health: number) {
    this.maxHealth = health;
  }

  getCollisionRecordID() {
    return this.collisionRecordID;
  }

  setCollisionRecordID(recordID: string) {
    if (this.collisionRecordID != '') {
      console.warn("A block's collision record ID has been changed. This may cause issues with collision detection. Record ID: " + this.collisionRecordID + " New Record ID: " + recordID)
    }
    this.collisionRecordID = recordID;
  }

  setSize(sizeX: number, sizeY: number) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
  }

  getSize() {
    return {
      x: this.sizeX,
      y: this.sizeY
    };
  }

  setColor(color: string) {
    this.color = color;
  }

  getColor() {
    return this.color;
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
