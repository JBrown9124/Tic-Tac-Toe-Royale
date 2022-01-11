import { Win } from "./Win";
export interface NewMove {
  playerId: string;
  rowIdx: number;
  tileIdx: number;
  win: Win;
}
