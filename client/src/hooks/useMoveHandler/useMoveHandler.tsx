import { useEffect, useState, useLayoutEffect, useMemo } from "react";
import { Lobby } from "../../Models/Lobby";
import { GameStatus } from "../../Models/GameStatus";
import botMove from "../../creators/APICreators/botNewMove";
import determineWinner from "../../creators/BoardCreators/determineWinner/determineWinner";
import { Player } from "../../Models/Player";
import { PowerUp, PowerUps } from "../../Models/PowerUp";
import useSound from "use-sound";
import getRandomInt from "../../creators/BoardCreators/getRandomInt";
import { powerUps } from "../../storage/powerUps";

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
  inventory: PowerUps;
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
  inventory,
}: UseMoveHandler) {
  const [startOtherPlayerMoveSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/otherPlayerMoveSound.mp3"
  );
  const [playYourTurnSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/yourTurnSound.mp3"
  );
  const [playFireSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/fireSound.mp3"
  );
  const [playArrowSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/arrowSound.mp3"
  );
  const [playBombSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/bombSound.mp3"
  );
  const [playCleaveSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/cleaveSound.mp3"
  );
  const [playSwapSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/swapSound.mp3"
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
        if (nextIsBot) {
          const reqBody = {
            lobbyId: lobby.lobbyId,
            playerId: nextIsBot.playerId,
          };

          const botDelay = setTimeout(() => {
            botMove(reqBody).then((botMoveResponse) => {
              if (botMoveResponse) {
                determineWinner(
                  botMoveResponse.rowIdx,
                  botMoveResponse.tileIdx,
                  board,
                  lobby.board.size,
                  botMoveResponse.playerId,
                  lobby.board.winBy,
                  lobby.lobbyId,
                  lobby.hostSid,
                  setGameStatus,
                  inventory
                );
              }
            });
          }, 500);

          startOtherPlayerMoveSound();
          return () => {
            clearTimeout(botDelay);
          };
        }
      });
    }
  }, [gameStatus.whoTurn, botCanMove, playerWhoLeftSessionId]);

  // Handles move order rotation
  useMemo(() => {
    let playerWhosTurnItIs = playerPieces[playerPieces.length - 1];
    if (isBoardCreated && playerWhosTurnItIs.playerId !== gameStatus.whoTurn) {
      let poppedPlayer = playerPieces.pop();

      if (poppedPlayer) {
        playerPieces.unshift(poppedPlayer);
      }
    }
    if (playerId === gameStatus.whoTurn) {
      playYourTurnSound();
    }
  }, [gameStatus.whoTurn]);

  const powerUpsAmount = Object.keys(powerUps).length;
  useMemo(() => {
    if (gameStatus.newMove.playerId === gameStatus.whoTurn) {
      startOtherPlayerMoveSound();
    }
    if (gameStatus.fireTiles.length > 0) {
      gameStatus?.fireTiles?.forEach((tile) => {
        board[tile.rowIdx][tile.tileIdx] = tile.playerId;
      });
    }
    if (gameStatus.newMove.playerId !== "") {
      board[gameStatus.newMove.rowIdx][gameStatus.newMove.tileIdx] =
        gameStatus.newMove.playerId;
    }

    if (gameStatus?.newPowerUpUse?.selectedPowerUpTiles?.length !== 0)
      switch (gameStatus?.newPowerUpUse?.powerUp?.name) {
        case "fire":
          board[gameStatus.newPowerUpUse.selectedPowerUpTiles[0].rowIdx][
            gameStatus.newPowerUpUse.selectedPowerUpTiles[0].tileIdx
          ] = "FIRE";
          playFireSound();
          break;
        case "arrow":
          for (
            let i = 0;
            i < gameStatus.newPowerUpUse.selectedPowerUpTiles.length;
            i++
          ) {
            board[gameStatus.newPowerUpUse.selectedPowerUpTiles[i].rowIdx][
              gameStatus.newPowerUpUse.selectedPowerUpTiles[i].tileIdx
            ] = getRandomInt(1, powerUpsAmount);
          }
          playArrowSound();
          break;
        case "cleave":
          for (
            let i = 0;
            i < gameStatus.newPowerUpUse.selectedPowerUpTiles.length;
            i++
          ) {
            board[gameStatus.newPowerUpUse.selectedPowerUpTiles[i].rowIdx][
              gameStatus.newPowerUpUse.selectedPowerUpTiles[i].tileIdx
            ] = getRandomInt(1, powerUpsAmount);
          }
          playCleaveSound();
          break;
        case "bomb":
          for (
            let i = 0;
            i < gameStatus.newPowerUpUse.selectedPowerUpTiles.length;
            i++
          ) {
            board[gameStatus.newPowerUpUse.selectedPowerUpTiles[i].rowIdx][
              gameStatus.newPowerUpUse.selectedPowerUpTiles[i].tileIdx
            ] = getRandomInt(1, powerUpsAmount);
          }
          playBombSound();
          break;
        case "swap":
          [
            board[gameStatus.newPowerUpUse.selectedPowerUpTiles[0].rowIdx][
              gameStatus.newPowerUpUse.selectedPowerUpTiles[0].tileIdx
            ],
            board[gameStatus.newPowerUpUse.selectedPowerUpTiles[1].rowIdx][
              gameStatus.newPowerUpUse.selectedPowerUpTiles[1].tileIdx
            ],
          ] = [
            board[gameStatus.newPowerUpUse.selectedPowerUpTiles[1].rowIdx][
              gameStatus.newPowerUpUse.selectedPowerUpTiles[1].tileIdx
            ],
            board[gameStatus.newPowerUpUse.selectedPowerUpTiles[0].rowIdx][
              gameStatus.newPowerUpUse.selectedPowerUpTiles[0].tileIdx
            ],
          ];
          playSwapSound();
      }
    setCount((state: number) => state + 1);
  }, [gameStatus.newMove, gameStatus.newPowerUpUse]);
}