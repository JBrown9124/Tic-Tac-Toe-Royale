import { GameStatus } from "../../Models/GameStatus";
import { Player } from "../../Models/Player";
import sortPlayerPieces from "./sortPlayerPieces";
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
    const playerWhoLeft = playerPieces.find((playerPiece) => {
      return playerPiece.sessionId === playerWhoLeftSessionId;
    });

    playerPieces.forEach((playerPiece, idx) => {
      if (
        playerWhoLeft?.turnNumber &&
        playerPiece.turnNumber > playerWhoLeft.turnNumber
      )
        playerPiece.turnNumber = playerPiece.turnNumber - 1;
    });
    const updatedPieces = playerPieces.filter((playerPiece) => {
      return playerPiece.sessionId !== playerWhoLeftSessionId;
    });

    updatedPieces.forEach((updatedPiece) => {
      if (updatedPiece.playerId === playerId) {
        setTurnNumber(updatedPiece.turnNumber);
      }
    });

    return updatedPieces;
  };
  removePlayerFromPieces().then((updatedPieces) => {
    const whoTurn = gameStatus.whoTurn;
    sortPlayerPieces(updatedPieces, { setPlayerPieces, whoTurn });
    setTimeout(() => {
      setGameStatus({
        win: {
          whoWon:
            updatedPieces.length === 1 ? updatedPieces[0].turnNumber : null,
          type: null,
          winningMoves: null,
        },
        whoTurn: whoTurn > updatedPieces.length ? 1 : whoTurn,
      });
    }, 1000);
  });
};

export default updateAfterPlayerLeaves;
