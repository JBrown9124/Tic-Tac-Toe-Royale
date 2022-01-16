import { GameStatus } from "../../Models/GameStatus";
import { Player } from "../../Models/Player";
// import sortPlayerPieces from "./sortPlayerPieces";
interface UpdateAfterPlayerLeavesArgs {
  playerPieces: Player[];

  setPlayerPieces: (plyerPieces: Player[]) => void;
  setGameStatus: (gameStatus: GameStatus) => void;
  gameStatus: GameStatus;
  playerWhoLeftSessionId: string;
  playerId: string;
}
const updateAfterPlayerLeaves = ({
  playerPieces,

  setPlayerPieces,
  setGameStatus,
  gameStatus,
  playerWhoLeftSessionId,
  playerId,
}: UpdateAfterPlayerLeavesArgs) => {
  const removePlayerFromPieces = async () => {
    for (var i = playerPieces.length; i--; ) {
      if (playerPieces[i].sessionId === playerWhoLeftSessionId) {
        playerPieces.splice(i, 1);
      }
    }

    return true;
  };
  removePlayerFromPieces().then((isUpdated) => {
    setGameStatus({
      win: {
        whoWon: playerPieces.length === 1 ? playerPieces[0]?.playerId : null,
        type: null,
        winningMoves: null,
      },
      whoTurn: playerPieces[playerPieces.length - 1]?.playerId,
      newMove: { playerId: "", rowIdx: 0, tileIdx: 0 },
    });
  });
};

export default updateAfterPlayerLeaves;
