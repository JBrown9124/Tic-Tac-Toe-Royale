import { Player } from "../../Models/Player";
interface SortPlayerPiecesArgs {
  playerPieces: Player[];
  setPlayerPieces: (playerPieces: Player[]) => void;
  whoTurn: number;
}
const sortPlayerPieces = async ({
  playerPieces,
  setPlayerPieces,
  whoTurn,
}: SortPlayerPiecesArgs) => {
  let sortedPlayerPieces = [];
  // const currentTurnPlayer = playerPieces.find((playerPiece) => {
  //   return playerPiece.turnNumber === whoTurn;
  // });
  // const lessThanCurrentTurn = playerPieces.filter((playerPiece) => {
  //   return (
  //     playerPiece.turnNumber !== whoTurn && playerPiece.turnNumber > whoTurn
  //   );
  // });
  // const greaterThanCurrentTurn = playerPieces.filter((playerPiece) => {
  //   return (
  //     playerPiece.turnNumber !== whoTurn && playerPiece.turnNumber < whoTurn
  //   );
  // });
  let currentTurnPlayer: Player = {
    name: null,
    piece: "",
    isHost: false,
    turnNumber: 0,
    isReady: false,
    playerId: "",
    playerLoaded: false,
    sessionId: "",
  };
  /* we assume playerPieces are sorted from lowest to highest server side */
  let lessThanCurrentTurn: Player[] = [];
  let greaterThanCurrentTurn: Player[] = [];
  for (let i = 0; i < playerPieces.length; i++) {
    if (playerPieces[i].turnNumber === whoTurn) {
      currentTurnPlayer = playerPieces[i];
    } else if (playerPieces[i].turnNumber < whoTurn) {
      lessThanCurrentTurn.push(playerPieces[i]);
    } else if (playerPieces[i].turnNumber > whoTurn)
      greaterThanCurrentTurn.push(playerPieces[i]);
  }
  if (currentTurnPlayer !== undefined) {
    sortedPlayerPieces.push(currentTurnPlayer);
    sortedPlayerPieces.unshift(...lessThanCurrentTurn);
    sortedPlayerPieces.unshift(...greaterThanCurrentTurn);
    console.log(whoTurn, "WHOTURN");
    console.log(sortedPlayerPieces, "SORTEDPLAYERPIECES");
    setPlayerPieces(sortedPlayerPieces);
  }
};
export default sortPlayerPieces;
