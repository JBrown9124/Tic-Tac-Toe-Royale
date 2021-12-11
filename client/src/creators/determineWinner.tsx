import socket from "../socket";
import newMove from "./newMove";
const determineWinner = (
  rowIdx: number,
  tileIdx: number,
  board: number[][],
  boardSize: number,
  playerNumber: number,
  setSessionCookies: Function,
  sessionCookies: any
) => {
  board[rowIdx][tileIdx] = playerNumber;

  // const checkHorizontal = () => {
  //   let concurrentValue = 0;
  //   for (let i = boardSize - 1; i >= 0; i--) {
  //     if (playerNumber !== board[rowIdx][i]) {
  //       concurrentValue = 0;
  //       continue;
  //     }

  //     concurrentValue += 1;
  //     if (concurrentValue === sessionCookies?.lobby?.board?.winBy) {
  //       return true;
  //     }
  //   }
  //   return false;
  // };
  const checkHorizontal = () => {
    let start = boardSize - 1 - tileIdx < tileIdx ? boardSize - 1 : 0;

    let concurrentValue = 0;
    if (start === 0) {
      let range =
        Math.abs(sessionCookies?.lobby?.board?.winBy - tileIdx) +
        sessionCookies?.lobby?.board?.winBy / 2;
      for (let i = start; i <= range; i++) {
        console.log(board[rowIdx][i], "horziontalStart0");
        if (playerNumber !== board[rowIdx][i]) {
          concurrentValue = 0;
          continue;
        }

        concurrentValue += 1;
        if (concurrentValue === sessionCookies?.lobby?.board?.winBy) {
          return true;
        }
      }
      return false;
    } else {
      let range = Math.abs(
        Math.abs(sessionCookies?.lobby?.board?.winBy - rowIdx) -
          sessionCookies?.lobby?.board?.winBy / 2
      );
      for (let i = start; i >= range; i--) {
        console.log(board[rowIdx][i], "horziontalStartNot0");
        if (playerNumber !== board[rowIdx][i]) {
          concurrentValue = 0;
          continue;
        }

        concurrentValue += 1;
        if (concurrentValue === sessionCookies?.lobby?.board?.winBy) {
          return true;
        }
      }
      return false;
    }
  };
  const checkVertical = () => {
    let start = boardSize - 1 - rowIdx < rowIdx ? boardSize - 1 : 0;

    let concurrentValue = 0;
    if (start === 0) {
      let range =
        Math.abs(sessionCookies?.lobby?.board?.winBy - rowIdx) +
        sessionCookies?.lobby?.board?.winBy / 2;
      for (let i = start; i <= range; i++) {
        console.log(board[i][tileIdx], "checkVertical");
        if (playerNumber !== board[i][tileIdx]) {
          concurrentValue = 0;
          continue;
        }

        concurrentValue += 1;
        if (concurrentValue === sessionCookies?.lobby?.board?.winBy) {
          return true;
        }
      }
      return false;
    } else {
      let range = Math.abs(
        Math.abs(sessionCookies?.lobby?.board?.winBy - rowIdx) -
          sessionCookies?.lobby?.board?.winBy / 2
      );
      for (let i = start; i >= range; i--) {
        if (playerNumber !== board[i][tileIdx]) {
          concurrentValue = 0;
          continue;
        }

        concurrentValue += 1;
        if (concurrentValue === sessionCookies?.lobby?.board?.winBy) {
          return true;
        }
      }
      return false;
    }
  };
  const checkDiagonal = () => {
   return false
  };
  // const checkHorizontal = (
  //   checkWinBy: number
  // ): Function | undefined | void | boolean => {
  //   const checkRowIdx = rowIdx;
  //   let checkTileIdx = tileIdx
  //   if (tileIdx >= checkWinBy) {
  //     checkTileIdx = tileIdx - checkWinBy;
  //   } else {
  //     checkTileIdx = tileIdx + checkWinBy;
  //   }

  //   const check = (
  //     winByBaseCheck: number
  //   ): Function | undefined | void | boolean => {
  //     if (board[checkRowIdx][checkTileIdx] === playerNumber) {
  //       return checkHorizontal(winByBaseCheck - 1);
  //     } else {
  //       return false;
  //     }
  //   };
  //   if (checkWinBy === -1) {
  //     return true;
  //   } else if (checkWinBy <= boardSize - 1) {
  //     return check(checkWinBy);
  //   } else if (checkWinBy > boardSize - 1) {
  //     checkHorizontal(checkWinBy - 1);
  //   }
  // };

  // const checkVertical = (
  //   checkWinBy: number
  // ): Function | undefined | void | boolean => {
  //   let checkRowIdx = rowIdx;
  //   let checkTileIdx = tileIdx
  //   if (rowIdx >= checkWinBy) {
  //     checkRowIdx = rowIdx - checkWinBy;
  //   } else {
  //     checkRowIdx = rowIdx + checkWinBy;
  //   }

  //   const check = (
  //     winByBaseCheck: number
  //   ): Function | undefined | void | boolean => {
  //     if (board[checkRowIdx][checkTileIdx] === playerNumber) {
  //       return checkVertical(winByBaseCheck - 1);
  //     } else {
  //       return false;
  //     }
  //   };
  //   if (checkWinBy === -1) {
  //     return true;
  //   } else if (checkWinBy <= boardSize - 1) {
  //     return check(checkWinBy);
  //   } else if (checkWinBy > boardSize - 1) {
  //     checkVertical(checkWinBy - 1);
  //   }
  // };

  // const checkDiagonal = (
  //   checkWinBy: number
  // ): Function | undefined | void | boolean => {
  //   let checkRowIdx = rowIdx;
  //   let checkTileIdx = tileIdx
  //   if (rowIdx >= checkWinBy) {
  //     checkRowIdx = rowIdx - checkWinBy;
  //   } else {
  //     checkRowIdx = rowIdx + checkWinBy;
  //   }
  //   if (tileIdx >= checkWinBy) {
  //     checkTileIdx = tileIdx - checkWinBy;
  //   } else {
  //     checkTileIdx = tileIdx + checkWinBy;
  //   }

  //   const check = (
  //     winByBaseCheck: number
  //   ): Function | undefined | void | boolean => {
  //     if (board[checkRowIdx][checkTileIdx] === playerNumber) {
  //       return checkDiagonal (winByBaseCheck - 1);
  //     } else {
  //       return false;
  //     }
  //   };
  //   if (checkWinBy === -1) {
  //     return true;
  //   } else if (checkWinBy <= boardSize - 1) {
  //     return check(checkWinBy);
  //   } else if (checkWinBy > boardSize - 1) {
  //     checkDiagonal (checkWinBy - 1);
  //   }
  // };
  // const checkVertical = () => {
  //   if (winBy % 2=== 0){}
  //   if (rowIdx + 1 <= boardSize - 1 && rowIdx - 1 >= 0) {
  //     if (
  //       cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 1][tileIdx] &&
  //       cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx - 1][tileIdx]
  //     ) {
  //       console.log("VerticalWinner");
  //       won = true;
  //     }
  //   }
  //   if (rowIdx - 2 >= 0) {
  //     if (
  //       cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx - 1][tileIdx] &&
  //       cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx - 2][tileIdx]
  //     ) {
  //       console.log("VerticalWinner");
  //       won = true;
  //     }
  //   }
  //   if (rowIdx + 2 <= boardSize - 1) {
  //     if (
  //       cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 1][tileIdx] &&
  //       cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 2][tileIdx]
  //     ) {
  //       console.log("VerticalWinner");
  //       won = true;
  //     }
  //   }
  // };
  // const checkHorizontal = () => {
  //   if (tileIdx + 1 <= boardSize - 1 && tileIdx - 1 >= 0) {
  //     if (
  //       cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx][tileIdx + 1] &&
  //       cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx][tileIdx - 1]
  //     ) {
  //       console.log("HorizontalWinner");
  //       won = true;
  //     }
  //   }
  //   if (tileIdx - 2 >= 0) {
  //     if (
  //       cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx][tileIdx - 1] &&
  //       cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx][tileIdx - 2]
  //     ) {
  //       console.log("HorizontalWinner");
  //       won = true;
  //     }
  //   }
  //   if (tileIdx + 2 <= boardSize - 1) {
  //     if (
  //       cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx][tileIdx + 1] &&
  //       cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx][tileIdx + 2]
  //     ) {
  //       console.log("HorizontalWinner");
  //       won = true;
  //     }
  //   }
  // };
  // const checkDiagonal = () => {
  //   if (
  //     rowIdx + 1 <= boardSize - 1 &&
  //     rowIdx - 1 >= 0 &&
  //     tileIdx + 1 <= boardSize - 1 &&
  //     tileIdx - 1 >= 0
  //   ) {
  //     if (
  //       (cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 1][tileIdx + 1] &&
  //         cacheBoard[rowIdx][tileIdx] ===
  //           cacheBoard[rowIdx - 1][tileIdx - 1]) ||
  //       (cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 1][tileIdx - 1] &&
  //         cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx - 1][tileIdx + 1])
  //     ) {
  //       console.log("DiagonalWinner");
  //       won = true;
  //     }
  //   }
  //   if (rowIdx + 2 <= boardSize - 1 && tileIdx - 2 >= 0) {
  //     if (
  //       cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 1][tileIdx - 1] &&
  //       cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 2][tileIdx - 2]
  //     ) {
  //       console.log("DiagonalWinner");
  //       won = true;
  //     }
  //   }
  //   if (rowIdx + 2 <= boardSize - 1 && tileIdx + 2 <= boardSize - 1) {
  //     if (
  //       cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 1][tileIdx + 1] &&
  //       cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 2][tileIdx + 2]
  //     ) {
  //       console.log("DiagonalWinner");
  //       won = true;
  //     }
  //   }
  // };

  // checkHorizontal();
  // checkDiagonal();

  // const horizontal = checkHorizontal(winBy)===true
  // const vertical = checkVertical(winBy)===true
  // const diagonal = checkDiagonal(winBy)===true
  // console.log(horizontal, "CheckHorizontal");
  // console.log(vertical, "CheckVertical");
  // console.log(diagonal, "CheckDiaganol");
  // console.log(checkHorizontal(), "checkHorizontal");
  let boardMove = {
    rowIdx: rowIdx,
    tileIdx: tileIdx,
    won: checkHorizontal() || checkVertical()||checkDiagonal(),
    playerNumber: playerNumber,
  };

  const reqBody = {
    lobbyId: sessionCookies?.lobby?.lobbyId,
    newMove: boardMove,
  };
  setSessionCookies("gameStatus", {
    whoWon: boardMove.won && playerNumber,
    whoTurn:
      sessionCookies.lobby.players.length === playerNumber
        ? 1
        : sessionCookies.gameStatus.whoTurn + 1,
  });
  newMove(reqBody);
  // if (sessionCookies?.boardMoves !==undefined){
  //   setSessionCookies("boardMoves",[...sessionCookies.boardMoves, boardMove], {path:"/"})}
  // else{ setSessionCookies("boardMoves",[], {path:"/"})}
};
export default determineWinner;
