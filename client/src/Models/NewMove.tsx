import { Win } from "./Win";
export interface NewMove {
  playerNumber: number;
  rowIdx: number;
  tileIdx: number;
  win: Win;
}
