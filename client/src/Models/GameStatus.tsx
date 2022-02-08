import { Win } from "./Win";
import {Move} from "./Move"
import {PowerUp} from "./PowerUp"
interface FireMove{
  playerId: string,
  rowIdx: number,
  columnIdx:number,
  playerIdWhoCast: string
}
export interface GameStatus {
  win: Win;
  whoTurn: string;
  newMove: Move;
  newPowerUpUse:{powerUp: PowerUp, selectedPowerUpTiles:Move[]}
  fireTiles:FireMove[]
}
