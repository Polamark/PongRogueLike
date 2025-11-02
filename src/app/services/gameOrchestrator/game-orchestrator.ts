import {Injectable, signal} from '@angular/core';
import {CollisionHandler} from '../collisionHandler/collision-handler';

@Injectable({
  providedIn: 'root'
})
export class GameOrchestrator {
  private money = signal<number>(0)

  private maxHits = signal<number>(20) //How many times can the player object be hit before round end
  private hitsLeft = signal<number>(this.maxHits())

  private requiredMoneyToContinue = 20

  private currentStatus = gameStatus.inGame
  constructor(
    collisionHandler: CollisionHandler,
  ) {

  }

  addMoney(money: number) {
    this.money.update(x => x + money);
  }

  getMoney() {
    return this.money
  }

  addHits(hits: number) {
    this.hitsLeft.update(x => x + hits)
  }

  getHits() {
    return this.hitsLeft
  }

  setMaxHits(hits: number) {
    this.maxHits.set(hits)
    this.hitsLeft.set(hits)
  }

  getMaxHits() {
    return this.maxHits
  }

  setRequiredMoneyToContinue(money: number) {}

  getRequiredMoneyToContinue() {
    return this.requiredMoneyToContinue
  }

  getStatus() {
    return this.currentStatus
  }

  noBallsRemaining() {
    this.currentStatus = gameStatus.over
  }

  getGameOver() {
    return this.currentStatus == gameStatus.over
  }
}

class gameStatus {
  static inShop = "shop"
  static inGame = "game"
  static inMenu = "menu"
  static over = "over"
}
