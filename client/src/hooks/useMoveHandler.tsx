import { useEffect, useLayoutEffect, useState } from "react";
import { Lobby } from "../Models/Lobby";
import { GameStatus } from "../Models/GameStatus";
import botNewMove from "../creators/APICreators/botNewMove";
import determineWinner from "../creators/BoardCreators/determineWinner";
import { Player } from "../Models/Player";
import { NewMove } from "../Models/NewMove";
import useSound from "use-sound";
import getRandomInt from "../creators/BoardCreators/getRandomInt";

interface UseMoveHandler {
  botCanMove: boolean;
  lobby: Lobby;
  gameStatus: GameStatus;
  playerPieces: Player[];
  setGameStatus: (gameStatus: GameStatus) => void;
  isHost: boolean;
  action: string;
  board: (string | number)[][];

  playerWhoLeftSessionId: string;
  isBoardCreated: boolean;
  playerId: string;
}
export default function useMoveHandler({
  botCanMove,
  lobby,
  gameStatus,
  isHost,
  action,
  board,
  setGameStatus,

  playerPieces,
  playerWhoLeftSessionId,
  isBoardCreated,
  playerId,
}: UseMoveHandler) {
  const [startOtherPlayerMoveSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/otherPlayerMoveSound.mp3"
  );
  const [playYourTurnSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/yourTurnSound.mp3"
  );
  const [count, setCount] = useState(1);
  useEffect(() => {
    if (!gameStatus.win.whoWon && isHost && botCanMove) {
      const findIfBot = async () => {
        return playerPieces.find((player) => {
          return (
            player.playerId === gameStatus.whoTurn &&
            player.playerId.substring(0, 3) === "BOT"
          );
        });
      };
      findIfBot().then((nextIsBot) => {
        if (nextIsBot !== undefined) {
          const reqBody = {
            lobbyId: lobby.lobbyId,
            playerId: nextIsBot.playerId,
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
          }, getRandomInt(500, 1500));

          startOtherPlayerMoveSound();
          return () => {
            clearTimeout(botDelay);
          };
        }
      });
    }
  }, [gameStatus, botCanMove, playerWhoLeftSessionId]);
  useEffect(() => {
    let playerWhosTurnItIs = playerPieces[playerPieces.length - 1];
    if (isBoardCreated && playerWhosTurnItIs.playerId !== gameStatus.whoTurn) {
      let poppedPlayer = playerPieces.pop();
      console.log(poppedPlayer, "POPPEDPLAYER");
      if (poppedPlayer !== undefined) {
        playerPieces.unshift(poppedPlayer);
        console.log(playerPieces, "AFTERPOP");
      }
    }
    // if (playerPieces[playerPieces.length - 1].playerId !== gameStatus.whoTurn){
    //   const poppedSecondPlayer = playerPieces.pop();
    // if (poppedSecondPlayer !== undefined) {
    //   playerPieces.unshift(poppedSecondPlayer);
    // }}
    if (playerId === gameStatus.whoTurn) {
      playYourTurnSound();
    }
  }, [gameStatus.whoTurn]);
  useEffect(() => {
    if (gameStatus.newMove.playerId === gameStatus.whoTurn) {
      startOtherPlayerMoveSound();
    }

    if (gameStatus.newMove.playerId !== "") {
      board[gameStatus.newMove.rowIdx][gameStatus.newMove.tileIdx] =
        gameStatus.newMove.playerId;
      setCount((state: number) => state + 1);
    }
  }, [gameStatus.newMove]);
}
