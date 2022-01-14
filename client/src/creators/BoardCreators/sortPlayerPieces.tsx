import { Player } from "../../Models/Player";
interface SortPlayerPiecesArgs {

  setPlayerPieces: (playerPieces: Player[]) => void;
  whoTurn: number;
}
const sortPlayerPieces = async (playerPieces:Player[],{
  
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
      
      sortedPlayerPieces.push(playerPieces[i]);
    } else if (playerPieces[i].turnNumber < whoTurn) {
      lessThanCurrentTurn.unshift(playerPieces[i]);
    } else if (playerPieces[i].turnNumber > whoTurn)
      greaterThanCurrentTurn.unshift(playerPieces[i]);
  }
  if (currentTurnPlayer !== undefined) {
    lessThanCurrentTurn.sort((a, b) => b.turnNumber - a.turnNumber);
    greaterThanCurrentTurn.sort((a, b) => b.turnNumber - a.turnNumber);
    console.log(greaterThanCurrentTurn, "GREATERTHANCURRENTTURN");
    console.log(lessThanCurrentTurn, "LESSTHANCURRENTTURN");
    console.log(currentTurnPlayer, "CURRENTURNPLAYER");
    sortedPlayerPieces.unshift(...greaterThanCurrentTurn);
    sortedPlayerPieces.unshift(...lessThanCurrentTurn);

    console.log(whoTurn, "WHOTURN");
    console.log(sortedPlayerPieces, "SORTEDPLAYERPIECES");
    setPlayerPieces(sortedPlayerPieces);
  }
};
export default sortPlayerPieces;
