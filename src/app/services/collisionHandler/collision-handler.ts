import {Injectable, signal} from '@angular/core';
import {GameLoopHandler} from '../gameLoopHandler/game-loop-handler';
import {toObservable} from '@angular/core/rxjs-interop';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollisionHandler {
  private records: CollisionRecord[] = []
  private collisionListener = new BehaviorSubject<collisionBroadcast | null>(null)
  private collisionListener$ = this.collisionListener.asObservable()

  constructor(
    private gameLoopHandler: GameLoopHandler,
  ) {
    gameLoopHandler.getGameUpdate().subscribe((x) => {

      this.checkCollision()
    })
  }

  private checkCollision() {
    for (let record of this.records) {
      for (let other of this.records) {
        if (record === other) {
          continue
        }
        //(record.getData().left < compareTo.getData().right && record.getData().right > compareTo.getData().left) && (record.getData().top < compareTo.getData().bottom && record.getData().bottom > compareTo.getData().top)
        if (
          record.getData().left < other.getData().right &&
          record.getData().right > other.getData().left &&
          record.getData().top < other.getData().bottom &&
          record.getData().bottom > other.getData().top
        ) {

          if (!record.isTouching(other)) {
            let distance = {
              left: Math.abs(record.getData().left - other.getData().right),
              right: Math.abs(record.getData().right - other.getData().left),
              top: Math.abs(record.getData().top - other.getData().bottom),
              bottom: Math.abs(record.getData().bottom - other.getData().top),
            }

            let lowest = Math.min(distance.left, distance.right, distance.top, distance.bottom)

            let collisions = {
              left: distance.left == lowest,
              right: distance.right == lowest,
              top: distance.top == lowest,
              bottom: distance.bottom == lowest,

            }
            this.collisionListener.next({
              source: record,
              sourceID: record.recordID,
              target: other,
              sidesCollided: collisions,
              distancesFromFaces: distance,
            })
          }
          record.touch(other)
        } else {
          record.untouch(other)
        }
      }
    }
  }

  createCollisionRecord(left: number, top: number, width: number, height: number, gameObject?: any, gameObjectType?: gameObjectType, renderType?: objectRenderType) {
    this.records.push(new CollisionRecord(left, top, width, height, gameObject, gameObjectType, renderType))
    if (gameObjectType == this.getGameObjectTypes().ball) {
      console.log(this.records[this.records.length - 1].getData())
    }
    return this.records[this.records.length - 1].recordID
  }

  updateCollisionRecord(recordID: string, left: number, top: number, width: number, height: number) {
    const record = this.records.find(record => record.recordID === recordID)
    if (record) {
      record.setData(left, top, width, height)
    }
  }

  removeCollisionRecord(recordID: string) {
    this.records = this.records.filter(record => record.recordID !== recordID)
  }

  getCollisionListener() {
    return this.collisionListener$
  }

  getGameObjectTypes() {
    return gameObjectType
  }

  getRenderTypes() {
    return objectRenderType
  }
}

class CollisionRecord {
  private left: number = 0
  private right: number = 0
  private top: number = 0
  private bottom: number = 0
  private gameObject: any = null;
  private gameObjectType: gameObjectType = gameObjectType.unassigned
  private renderType: objectRenderType = objectRenderType.rectangle
  private touching: string[] = [];
  readonly recordID: string = crypto.randomUUID()

  constructor(left: number, top: number, width: number, height: number, gameObject?: any, gameObjectType?: gameObjectType, renderType?: objectRenderType) {

    if (!renderType) {
      console.error("Object does not have a render type. Defaulting to rectangle.")
    } else {
      this.renderType = renderType
    }

    if (this.renderType == objectRenderType.rectangle) {
      this.left = left
      this.top = top
      this.bottom = top + height
      this.right = left + width
    } else if (this.renderType == objectRenderType.circle) {
      this.left = left - width
      this.top = top - height
      this.bottom = top + height
      this.right = left + width
    }
    this.gameObject = gameObject
    if (!gameObject) {
      console.warn('A collision record has been created with no game object.')
    }

    if (gameObject && !gameObjectType) {
      console.error('A collision record has been created with a game object with no game object type.\n', gameObject)
    } else if (gameObjectType) {
      this.gameObjectType = gameObjectType
    }
  }

  getData() {
    return {
      left: this.left,
      right: this.right,
      top: this.top,
      bottom: this.bottom,
    }
  }

  setData(left: number, top: number, width: number, height: number) {
    if (this.renderType == objectRenderType.rectangle) {
      this.left = left
      this.top = top
      this.bottom = top + height
      this.right = left + width
    } else if (this.renderType == objectRenderType.circle) {
      this.left = left - width
      this.top = top - height
      this.bottom = top + height
      this.right = left + width
    }
  }

  getGameObject() {
    return {
      object: this.gameObject,
      objectType: this.gameObjectType,
    }
  }

  isTouching(otherRecord: CollisionRecord) {
    return this.touching.includes(otherRecord.recordID)
  }

  touch(otherRecord: CollisionRecord) {
    this.touching.push(otherRecord.recordID)
  }

  untouch(otherRecord: CollisionRecord) {
    this.touching = this.touching.filter(recordID => recordID !== otherRecord.recordID)
  }
}

class gameObjectType {
  static player = 'player'
  static ball = 'ball'
  static block = 'block'
  static wall = 'wall'
  static void = 'void'
  static unassigned = 'unassigned'
}

class objectRenderType {
  static rectangle = 'rectangle'
  static circle = 'circle'
}

interface collisionBroadcast {
  source: CollisionRecord,
  sourceID: string,
  target: CollisionRecord,
  sidesCollided: {
    left: boolean,
    right: boolean,
    top: boolean,
    bottom: boolean,
  },
  distancesFromFaces: {
    left: number,
    right: number,
    top: number,
    bottom: number,
  }
}
