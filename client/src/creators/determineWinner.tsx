import socket from "../socket";
import newMove from "./newMove";
const determineWinner = (
  rowIdx: number,
  tileIdx: number,
  cacheBoard: number[][],
  boardSize: number,
  playerNumber: number,
  setSessionCookies: Function,
  sessionCookies: any
) => {
  cacheBoard[rowIdx][tileIdx] = playerNumber;
  let won = false;

  const checkVertical = () => {
    if (rowIdx + 1 <= boardSize - 1 && rowIdx - 1 >= 0) {
      if (
        cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 1][tileIdx] &&
        cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx - 1][tileIdx]
      ) {
        console.log("VerticalWinner");
        won = true;
      }
    }
    if (rowIdx - 2 >= 0) {
      if (
        cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx - 1][tileIdx] &&
        cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx - 2][tileIdx]
      ) {
        console.log("VerticalWinner");
        won = true;
      }
    }
    if (rowIdx + 2 <= boardSize - 1) {
      if (
        cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 1][tileIdx] &&
        cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 2][tileIdx]
      ) {
        console.log("VerticalWinner");
        won = true;
      }
    }
  };
  const checkHorizontal = () => {
    if (tileIdx + 1 <= boardSize - 1 && tileIdx - 1 >= 0) {
      if (
        cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx][tileIdx + 1] &&
        cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx][tileIdx - 1]
      ) {
        console.log("HorizontalWinner");
        won = true;
      }
    }
    if (tileIdx - 2 >= 0) {
      if (
        cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx][tileIdx - 1] &&
        cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx][tileIdx - 2]
      ) {
        console.log("HorizontalWinner");
        won = true;
      }
    }
    if (tileIdx + 2 <= boardSize - 1) {
      if (
        cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx][tileIdx + 1] &&
        cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx][tileIdx + 2]
      ) {
        console.log("HorizontalWinner");
        won = true;
      }
    }
  };
  const checkDiagonal = () => {
    if (
      rowIdx + 1 <= boardSize - 1 &&
      rowIdx - 1 >= 0 &&
      tileIdx + 1 <= boardSize - 1 &&
      tileIdx - 1 >= 0
    ) {
      if (
        (cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 1][tileIdx + 1] &&
          cacheBoard[rowIdx][tileIdx] ===
            cacheBoard[rowIdx - 1][tileIdx - 1]) ||
        (cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 1][tileIdx - 1] &&
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx - 1][tileIdx + 1])
      ) {
        console.log("DiagonalWinner");
        won = true;
      }
    }
    if (rowIdx + 2 <= boardSize - 1 && tileIdx - 2 >= 0) {
      if (
        cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 1][tileIdx - 1] &&
        cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 2][tileIdx - 2]
      ) {
        console.log("DiagonalWinner");
        won = true;
      }
    }
    if (rowIdx + 2 <= boardSize - 1 && tileIdx + 2 <= boardSize - 1) {
      if (
        cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 1][tileIdx + 1] &&
        cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 2][tileIdx + 2]
      ) {
        console.log("DiagonalWinner");
        won = true;
      }
    }
  };

  checkHorizontal();
  checkDiagonal();
  checkVertical();
  let boardMove = {
    rowIdx: rowIdx,
    tileIdx: tileIdx,
    won: won,
    playerNumber: playerNumber,
  };

  const reqBody = {
    lobbyId: sessionCookies?.lobby?.lobbyId,
    newMove: boardMove,
  };
  setSessionCookies("gameStatus", {whoWon:won && playerNumber, whoTurn:sessionCookies.lobby.players.length===playerNumber?1:sessionCookies.gameStatus.whoTurn+1})
  newMove(reqBody);
  // if (sessionCookies?.boardMoves !==undefined){
  //   setSessionCookies("boardMoves",[...sessionCookies.boardMoves, boardMove], {path:"/"})}
  // else{ setSessionCookies("boardMoves",[], {path:"/"})}
};
export default determineWinner;
