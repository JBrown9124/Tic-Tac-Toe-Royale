import { Win } from "./Win";
import {Move} from "./Move"
export interface GameStatus {
  win: Win;
  whoTurn: string;
  newMove: Move;
}
