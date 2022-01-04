import { Win } from "./Win";
export interface NewMove {
  turnNumber: number;
  rowIdx: number;
  tileIdx: number;
  win: Win;
}
