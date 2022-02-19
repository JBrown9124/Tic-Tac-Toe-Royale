import { useEffect } from "react";
import { GameStatus } from "../../../Models/GameStatus";
import { Player } from "../../../Models/Player";
import { Lobby } from "../../../Models/Lobby";
import botMove from "../../../creators/APICreators/botMove";
import determineWinner from "../../../creators/BoardCreators/determineWinner/determineWinner";
import { PowerUps } from "../../../Models/PowerUp";
import { VolumeContext } from "../../../storage/VolumeContext";
import { useContext } from "react";
import useSound from "use-sound";
interface useBotMoveUpdaterProps {
  playerWhoLeftSessionId: string;
  botCanMove: boolean;
  playerPieces: Player[];
  lobby: Lobby;
  board: (string | number)[][];
  gameStatus: GameStatus;
  setGameStatus: (gameStatus: GameStatus) => void;

  isHost: boolean;
  inventory: PowerUps;
}
export default function useBotMoveUpdater({
  playerWhoLeftSessionId,
  botCanMove,
  playerPieces,
  lobby,
  board,
  gameStatus,
  setGameStatus,

  isHost,
  inventory,
}: useBotMoveUpdaterProps) {
  const volume: number = useContext(VolumeContext);
  const [startOtherPlayerMoveSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/otherPlayerMoveSound.mp3",
    { volume: volume }
  );

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
                  botMoveResponse.columnIdx,
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

         
          return () => {
            clearTimeout(botDelay);
          };
        }
      });
    }
  }, [gameStatus.whoTurn, botCanMove, playerWhoLeftSessionId]);
}
