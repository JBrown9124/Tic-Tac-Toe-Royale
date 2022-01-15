import { GameStatus } from "../../Models/GameStatus";
import { Player } from "../../Models/Player";
// import sortPlayerPieces from "./sortPlayerPieces";
interface UpdateAfterPlayerLeavesArgs {
  playerPieces: Player[];
  setTurnNumber: (turnNumber: number) => void;
  setPlayerPieces: (plyerPieces: Player[]) => void;
  setGameStatus: (gameStatus: GameStatus) => void;
  gameStatus: GameStatus;
  playerWhoLeftSessionId: string;
  playerId: string;
}
const updateAfterPlayerLeaves = ({
  playerPieces,
  setTurnNumber,
  setPlayerPieces,
  setGameStatus,
  gameStatus,
  playerWhoLeftSessionId,
  playerId,
}: UpdateAfterPlayerLeavesArgs) => {
  const removePlayerFromPieces = async (): Promise<Player[]> => {
  
    const updatedPieces = playerPieces.filter((playerPiece) => {
      return playerPiece.sessionId !== playerWhoLeftSessionId;
    });

   
    return updatedPieces;
  };
  removePlayerFromPieces().then((updatedPieces) => {
   
    // sortPlayerPieces(updatedPieces, { setPlayerPieces, whoTurn });
    setTimeout(() => {
      setGameStatus({
        win: {
          whoWon:
            updatedPieces.length === 1 ? updatedPieces[0]?.playerId : null,
          type: null,
          winningMoves: null,
        },
        whoTurn: updatedPieces[updatedPieces.length - 1]?.playerId,
      });
    }, 1000);
  });
};

export default updateAfterPlayerLeaves;
