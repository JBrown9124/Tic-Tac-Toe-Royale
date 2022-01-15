export interface Player {
  name: string|null;
  piece: string| JSX.Element;
  isHost:boolean;

  isReady:boolean;
  playerId:string;
  playerLoaded:boolean,
  sessionId:string;
  height?:number
}
