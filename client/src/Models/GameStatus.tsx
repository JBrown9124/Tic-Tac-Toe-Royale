import { Win } from "./Win";
import {NewMove} from "./NewMove"
export interface GameStatus {
  win: Win;
  whoTurn: string;
  newMove: NewMove;
}
