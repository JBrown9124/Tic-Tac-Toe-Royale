import { Player } from "./Player";
import { GameStatus } from "./GameStatus";
import { Board } from "./Board";


export interface Lobby {
  board: Board;
  gameStatus: GameStatus;
  players: Player[];
  lobbyId: number;
  hostSid: number;
}
