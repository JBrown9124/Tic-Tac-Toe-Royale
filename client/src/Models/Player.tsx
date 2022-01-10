export interface Player {
  name: string|null;
  piece: string| JSX.Element;
  isHost:boolean;
  turnNumber:number;
  isReady:boolean;
  playerId:string;
  playerLoaded:boolean,
  sessionId:string;
}
