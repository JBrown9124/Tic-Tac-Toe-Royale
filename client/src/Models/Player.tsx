export interface Player {
  name: string;
  piece: string| JSX.Element;
  isHost:boolean;
  turnNumber:number;
  isReady:boolean;
  playerId:string;
  playerLoaded:boolean
}
