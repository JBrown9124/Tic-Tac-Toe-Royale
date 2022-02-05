import { Lobby } from "../../Models/Lobby";
import { GameStatus } from "../../Models/GameStatus";
import { Player } from "../../Models/Player";
import { PowerUps } from "../../Models/PowerUp";
import useBotMoveUpdater from "./updaters/useBotMoveUpdater";
import useTurnOrderUpdater from "./updaters/useTurnOrderUpdater";
import usePowerUpMoveUpdater from "./updaters/usePowerUpMoveUpdater/usePowerUpMoveUpdater";

interface UseMoveHandler {
  botCanMove: boolean;
  lobby: Lobby;
  playerPieces: Player[];
  playerWhoLeftSessionId: string;
  isHost: boolean;
  playerId: string;
  inventory: PowerUps;
  isBoardCreated: boolean;
  board: (string | number)[][];
  gameStatus: GameStatus;
  setGameStatus: (gameStatus: GameStatus) => void;
}

export default function useMoveHandler({
  botCanMove,
  lobby,
  playerPieces,
  playerWhoLeftSessionId,
  isHost,
  playerId,
  inventory,
  isBoardCreated,
  board,
  gameStatus,
  setGameStatus,
}: UseMoveHandler) {
  useBotMoveUpdater({
    playerWhoLeftSessionId,
    botCanMove,
    playerPieces,
    lobby,
    board,
    gameStatus,
    setGameStatus,
    isHost,
    inventory,
  });

  useTurnOrderUpdater(playerId, isBoardCreated, gameStatus, playerPieces);

  usePowerUpMoveUpdater(gameStatus, board);
}
