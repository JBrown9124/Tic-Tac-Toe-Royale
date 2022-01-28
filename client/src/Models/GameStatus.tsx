import { Win } from "./Win";
import {Move} from "./Move"
import {PowerUp} from "./PowerUp"
export interface GameStatus {
  win: Win;
  whoTurn: string;
  newMove: Move;
  newPowerUpUse:{powerUp: PowerUp, selectedPowerUpTiles:Move[]}
}
