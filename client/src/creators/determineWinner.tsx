import socket from "../socket";
import newMove from "./newMove"
const determineWinner = (rowIdx: number, tileIdx: number, cacheBoard:number[][], boardSize:number, playerNumber:number, setSessionCookies:Function, sessionCookies:any) => {
  let boardMove = {playerNumber:playerNumber, rowIdx:rowIdx, tileIdx:tileIdx}  
  cacheBoard[rowIdx][tileIdx] = playerNumber;
  const reqBody={lobbyId:sessionCookies?.lobby?.lobbyId, newMove:boardMove}  
  newMove(reqBody);
    const checkVertical = () => {
      if (rowIdx + 1 <= boardSize - 1 && rowIdx - 1 >= 0) {
        if (
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 1][tileIdx] &&
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx - 1][tileIdx]
        ) {
          console.log("VerticalWinner");
        }
      } if (rowIdx - 2 >= 0) {
        if (
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx - 1][tileIdx] &&
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx - 2][tileIdx]
        ) {
          console.log("VerticalWinner");
        }
      } if (rowIdx + 2 <= boardSize - 1) {
        if (
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 1][tileIdx] &&
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 2][tileIdx]
        ) {
          console.log("VerticalWinner");
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
        }
      }
      if (tileIdx - 2 >= 0) {
        if (
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx][tileIdx - 1] &&
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx][tileIdx - 2]
        ) {
          console.log("HorizontalWinner");
        }
      }
      if (tileIdx + 2 <= boardSize - 1) {
        if (
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx][tileIdx + 1] &&
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx][tileIdx + 2]
        ) {
          console.log("HorizontalWinner");
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
          (cacheBoard[rowIdx][tileIdx] ===
            cacheBoard[rowIdx + 1][tileIdx + 1] &&
            cacheBoard[rowIdx][tileIdx] ===
              cacheBoard[rowIdx - 1][tileIdx - 1]) ||
          (cacheBoard[rowIdx][tileIdx] ===
            cacheBoard[rowIdx + 1][tileIdx - 1] &&
            cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx - 1][tileIdx + 1])
        ) {
          console.log("DiagonalWinner");
        }
      }
      if (rowIdx + 2 <= boardSize - 1 && tileIdx - 2 >= 0) {
        if (
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 1][tileIdx - 1] &&
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 2][tileIdx - 2]
        ) {
          console.log("DiagonalWinner");
        }
      }
      if (rowIdx + 2 <= boardSize - 1 && tileIdx + 2 <= boardSize - 1) {
        if (
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 1][tileIdx + 1] &&
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 2][tileIdx + 2]
        ) {
          console.log("DiagonalWinner");
        }
      }
    };
   
    checkHorizontal();
    checkDiagonal();
    checkVertical();
    // if (sessionCookies?.boardMoves !==undefined){
    //   setSessionCookies("boardMoves",[...sessionCookies.boardMoves, boardMove], {path:"/"})}
    // else{ setSessionCookies("boardMoves",[], {path:"/"})}
    
  };
export default determineWinner