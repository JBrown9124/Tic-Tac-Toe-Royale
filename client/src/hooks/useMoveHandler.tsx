import { useEffect } from "react";
import { Lobby } from "../Models/Lobby";
import { GameStatus } from "../Models/GameStatus";
import botNewMove from "../creators/APICreators/botNewMove";
import determineWinner from "../creators/BoardCreators/determineWinner";
import { Player } from "../Models/Player";
import { NewMove } from "../Models/NewMove";
import useSound from "use-sound";
import getRandomInt from "../creators/BoardCreators/getRandomInt"
interface UseMoveHandler {
  botCanMove: boolean;
  lobby: Lobby;
  gameStatus: GameStatus;
  playerPieces: Player[];
  setGameStatus: (gameStatus: GameStatus) => void;
  isHost: boolean;
  action: string;
  board: (string | number)[][];
  newMove: NewMove;
  playerWhoLeftSessionId: string;
}
export default function useMoveHandler({
  botCanMove,
  lobby,
  gameStatus,
  isHost,
  action,
  board,
  setGameStatus,
  newMove,
  playerPieces,
  playerWhoLeftSessionId,
}: UseMoveHandler) {
  const [startOtherPlayerMoveSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/otherPlayerMoveSound.mp3"
  );
  useEffect(() => {
    if (botCanMove) {
      const findIfBot = async () => {
        return playerPieces.find((player) => {
          return (
            player.turnNumber === gameStatus.whoTurn &&
            player.playerId.substring(0, 3) === "BOT"
          );
        });
      };
      findIfBot().then((nextIsBot) => {
        if (
          isHost &&
          nextIsBot !== undefined &&
          !gameStatus.win.whoWon &&
          botCanMove
        ) {
          const reqBody = {
            lobbyId: lobby.lobbyId,
            playerId: nextIsBot.playerId,
            turnNumber: nextIsBot.turnNumber,
          };
          
          const botDelay = setTimeout(() => {
            botNewMove(reqBody).then((botNewMoveResponse) => {
              if (botNewMoveResponse) {
                determineWinner(
                  botNewMoveResponse.rowIdx,
                  botNewMoveResponse.tileIdx,
                  board,
                  lobby.board.size,
                  botNewMoveResponse.playerId,

                  lobby.board.winBy,
                  lobby.lobbyId,
                  lobby.hostSid,
                  setGameStatus
                );
              }
            });
          }, getRandomInt(500,1500));

          startOtherPlayerMoveSound();
          return () => {
            clearTimeout(botDelay);
          };
        }
      });
    }
  }, [gameStatus, botCanMove, playerWhoLeftSessionId]);
  useEffect(() => {
    if (newMove.playerId !== "") {
      board[newMove.rowIdx][newMove.tileIdx] = newMove.playerId;

      startOtherPlayerMoveSound();
    }
  }, [newMove]);
}
