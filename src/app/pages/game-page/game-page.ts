import { Component } from '@angular/core';
import {PlayerController} from '../../services/playerController/player-controller';
import {Ball} from '../../assets/ball/ball';

@Component({
  selector: 'app-game-page',
  imports: [
    Ball
  ],
  templateUrl: './game-page.html',
  styleUrl: './game-page.css',
})
export class GamePage {

  constructor(
    public playerController: PlayerController,
  ) { }

}
