import {Injectable} from '@angular/core';
import {CollisionHandler} from '../collisionHandler/collision-handler';

@Injectable({
  providedIn: 'root'
})
export class BlockController {
  private blocks: Block[] = []

  constructor(
    public collisionHandler: CollisionHandler,
  ) {
    collisionHandler.getCollisionListener().subscribe(collision => {
      let block = this.blocks.find((x) => {
        return x.getCollisionRecordID() == collision?.sourceID
      })
      if (block) {
        if (collision?.target?.getGameObject().objectType == collisionHandler.getGameObjectTypes().ball) {
          this.deleteBlock(block)
        }
      }
    })
  }

  createBlock(positionX: number, positionY: number, sizeX: number, sizeY: number, color: string) {
    let block = new Block(sizeX, sizeY, color, "", positionX, positionY)
    const ballCollisionRecordID = this.collisionHandler.createCollisionRecord(positionX, positionY, sizeX, sizeY, block, this.collisionHandler.getGameObjectTypes().block, this.collisionHandler.getRenderTypes().rectangle)
    block.setCollisionRecordID(ballCollisionRecordID)
    this.blocks.push(block)
  }

  getBlocks() {
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

  private positionX: number = 100;
  private positionY: number = 100;

  private collisionRecordID: string = ''

  constructor(sizeX: number, sizeY: number, color: string, recordID: string, positionX: number = 100, positionY: number = 100) {
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
  }

  getCollisionRecordID() {
    return this.collisionRecordID;
  }

  setCollisionRecordID(recordID: string) {
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
