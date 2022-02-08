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
const updateAfterPlayerLeaves = async ({
  playerPieces,
  setGameStatus,
  playerWhoLeftSessionId,
  }: UpdateAfterPlayerLeavesArgs) => {
  const removePlayerFromPieces = async () => {
    for (var i = playerPieces.length; i--; ) {
      if (playerPieces[i].sessionId === playerWhoLeftSessionId) {
        playerPieces.splice(i, 1);
      }
    }
  };
  await removePlayerFromPieces();
  setGameStatus({
    win: {
      whoWon: playerPieces.length === 1 ? playerPieces[0]?.playerId : null,
      type: null,
      winningMoves: null,
    },
    whoTurn: playerPieces[playerPieces.length - 1]?.playerId,
    newMove: { playerId: "", rowIdx: 0, tileIdx: 0 },
    newPowerUpUse: {
      powerUp: {
        value: 0,
        name: "",
        description: "",
        imgUrl: "",
        quantity: 0,
        rules: {
          affectsCaster: false,
          direction: {
            isVertical: false,
            isHorizontal: false,
            isDiagonal: false,
          },
          castAnywhere: false,
          tilesAffected: 0,
          mustBeEmptyTile: false,
          areaShape: "line",
        },
        selectColor: "",
      },
      selectedPowerUpTiles: [],
    },
    fireTiles: [],
  });
};

export default updateAfterPlayerLeaves;
