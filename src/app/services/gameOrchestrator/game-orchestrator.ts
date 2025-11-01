import {Injectable, signal} from '@angular/core';
import {CollisionHandler} from '../collisionHandler/collision-handler';

@Injectable({
  providedIn: 'root'
})
export class GameOrchestrator {
  private money = signal<number>(0)
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
}

class gameStatus {
  static inShop = "shop"
  static inGame = "game"
  static inMenu = "menu"

}
