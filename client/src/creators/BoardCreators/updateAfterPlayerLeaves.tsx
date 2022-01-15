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
  const removePlayerFromPieces = async () => {
    // const updatedPieces = playerPieces.filter((playerPiece) => {
    //   return playerPiece.sessionId !== playerWhoLeftSessionId;
    // });

    for (var i = playerPieces.length; i--; ) {
      if (playerPieces[i].sessionId === playerWhoLeftSessionId) {
        playerPieces.splice(i, 1);
      }
    }
    // return updatedPieces;
    return true
  };
  removePlayerFromPieces().then((updatedPieces) => {
    // sortPlayerPieces(updatedPieces, { setPlayerPieces, whoTurn });
    // setPlayerPieces(updatedPieces);
    setTimeout(() => {
      setGameStatus({
        win: {
          whoWon:
            playerPieces.length === 1 ? playerPieces[0]?.playerId : null,
          type: null,
          winningMoves: null,
        },
        whoTurn: playerPieces[playerPieces.length - 1]?.playerId,
      });
    }, 1000);
  });
};

export default updateAfterPlayerLeaves;
