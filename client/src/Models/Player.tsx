import {PowerUp} from "./PowerUp"
export interface Player {
  name: string|null;
  piece: string| JSX.Element;
  isHost:boolean;
  inventory:PowerUp[],
  isReady:boolean;
  playerId:string;
  playerLoaded:boolean,
  sessionId:string;
  height?:number
}
