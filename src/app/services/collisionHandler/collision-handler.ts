import { Injectable } from '@angular/core';
import {GameLoopHandler} from '../gameLoopHandler/game-loop-handler';

@Injectable({
  providedIn: 'root'
})
export class CollisionHandler {
  private records: CollisionRecord[] = []
  constructor(
    gameLoopHandler: GameLoopHandler,
  ) {
    gameLoopHandler.getGameUpdate().subscribe(() => {
      this.checkCollision()
    })
  }

  private checkCollision() {
    for (let record of this.records) {
      for (let compareTo of this.records) {
        if (record.getData().right > compareTo.getData().left && record.getData().left < compareTo.getData().right && record.getData().bottom > compareTo.getData().top && record.getData().top < compareTo.getData().bottom) {
          console.log('Collision detected')
        }
      }
    }
  }

  createCollisionRecord(top: number, left: number, width: number, height: number) {
    this.records.push(new CollisionRecord(top, left, width, height))
    return this.records[this.records.length - 1].recordID
  }

  updateCollisionRecord(recordID: string, top: number, left: number, width: number, height: number) {
    const record = this.records.find(record => record.recordID === recordID)
    if (record) {
      record.setData(top, left, width, height)
    }
  }

  removeCollisionRecord(recordID: string) {
    this.records = this.records.filter(record => record.recordID !== recordID)
  }
}

class CollisionRecord {
  private top: number = 0
  private bottom: number = 0
  private left: number = 0
  private right: number = 0
  readonly recordID: string = crypto.randomUUID()

  constructor(top: number, left: number, width: number, height: number) {
    this.top = top
    this.left = left
    this.bottom = top + height
    this.right = left + width
  }

  getData() {
    return {
      top: this.top,
      bottom: this.bottom,
      left: this.left,
      right: this.right
    }
  }

  setData(top: number, left: number, width: number, height: number) {
    this.top = top
    this.left = left
    this.bottom = top + height
    this.right = left + width
  }

}
