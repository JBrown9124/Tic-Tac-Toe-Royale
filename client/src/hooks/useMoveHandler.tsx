import {useEffect} from "react"
import {Lobby} from "../Models/Lobby"
import {GameStatus} from "../Models/GameStatus"
import botNewMove from "../creators/APICreators/botNewMove"
import determineWinner from "../creators/BoardCreators/determineWinner"
import {NewMove} from "../Models/NewMove"
import useSound from "use-sound"
interface UseMoveHandler{
    botCanMove:boolean,
    lobby:Lobby,
    gameStatus:GameStatus
    setGameStatus:(gameStatus:GameStatus)=>void,
    isHost:boolean,
    sessionCookie:any, 
    board:number[][],
    newMove:NewMove



}
export default function useMoveHandler({botCanMove, lobby, gameStatus, isHost, sessionCookie, board, setGameStatus, newMove}:UseMoveHandler){
    const [startOtherPlayerMoveSound] = useSound(
        process.env.PUBLIC_URL + "static/assets/sounds/otherPlayerMoveSound.mp3"
      );
    useEffect(() => {
        if (botCanMove) {
          const findIfBot = async () => {
            return lobby.players.find((player) => {
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
                lobbyId: sessionCookie.lobbyId,
                playerId: nextIsBot.playerId,
                turnNumber: nextIsBot.turnNumber,
              };
              botNewMove(reqBody).then((botNewMoveResponse) => {
                if (botNewMoveResponse) {
                  determineWinner(
                    botNewMoveResponse.rowIdx,
                    botNewMoveResponse.tileIdx,
                    board,
                    lobby.board.size,
                    botNewMoveResponse.turnNumber,
    
                    lobby.board.winBy,
                    lobby.lobbyId,
                    lobby.hostSid,
                    setGameStatus
                  );
                }
              });
    
              startOtherPlayerMoveSound();
            }
          });
        }
      }, [gameStatus, botCanMove]);
      useEffect(() => {
        if (newMove.turnNumber !== undefined && newMove.turnNumber !== 0) {
          board[newMove.rowIdx][newMove.tileIdx] = newMove.turnNumber;
          startOtherPlayerMoveSound();
        }
      }, [newMove]);
}