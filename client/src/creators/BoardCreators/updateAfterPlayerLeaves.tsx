import { GameStatus } from "../../Models/GameStatus";
import {Player} from "../../Models/Player"
import sortPlayerPieces from "./sortPlayerPieces"
interface UpdateAfterPlayerLeavesArgs{
playerPieces:Player[],
setTurnNumber:(turnNumber:number) => void,
setPlayerPieces:(plyerPieces:Player[])=>void,
setGameStatus:(gameStatus:GameStatus) => void,
gameStatus:GameStatus,
playerWhoLeft:string,
playerId:string,
}
const updateAfterPlayerLeaves = ({playerPieces,
    setTurnNumber,
    setPlayerPieces,
    setGameStatus,
    gameStatus,
    playerWhoLeft,
    playerId,}:UpdateAfterPlayerLeavesArgs)=>{
    const removePlayerFromPieces = async (): Promise<Player[]> => {
        const updatedPieces = playerPieces.filter((playerPiece) => {
          return playerPiece.sessionId !== playerWhoLeft;
        });
        updatedPieces.map((playerPiece, idx) => {
          playerPiece.turnNumber = idx + 1;
          if (playerPiece.playerId === playerId) {
            setTurnNumber(playerPiece.turnNumber);
          }
        });
        return updatedPieces;
      };
      removePlayerFromPieces().then((updatedPieces) => {
        setPlayerPieces(updatedPieces);
        
        const whoTurn = gameStatus.whoTurn;
        sortPlayerPieces({ playerPieces, setPlayerPieces, whoTurn})
        setGameStatus({
          win: {
            whoWon:
              updatedPieces.length === 1 ? updatedPieces[0].turnNumber : null,
            type: null,
            winningMoves: null,
          },
          whoTurn: whoTurn >= playerPieces.length ? 1 : whoTurn,
        });
      });
}

export default updateAfterPlayerLeaves