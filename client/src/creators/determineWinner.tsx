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

  const checkHorizontal = (winBy: number) => {
    let left = tileIdx;
    let right = tileIdx;
    let leftWinBy = 0;
    let rightWinBy = 0;

    while (
      (left > 0 && leftWinBy <= winBy - 1) ||
      (right < boardSize - 1 && rightWinBy <= winBy - 1)
    ) {
      if (left > 0 && leftWinBy <= winBy) {
        left -= 1;
        leftWinBy += 1;
        console.log(0, "horizontalLeft");
      }
      if (right < boardSize - 1 && rightWinBy <= winBy - 1) {
        right += 1;
        rightWinBy += 1;
        console.log(0, "horizontalRight");
      }
    }
    let concurrentValue = 0;
    for (let i = left; i <= right; i++) {
      console.log(0, "horziontalFor");

      if (playerNumber !== board[rowIdx][i]) {
        concurrentValue = 0;
        continue;
      }

      concurrentValue += 1;
      if (concurrentValue === winBy) {
        return true;
      }
    }
  };
  const checkVertical = (winBy: number) => {
    let topWinBy = 0;
    let bottomWinBy = 0;
    let top = rowIdx;
    let bottom = rowIdx;

    while (
      (top > 0 && topWinBy <= winBy - 1) ||
      (bottom < boardSize - 1 && bottomWinBy <= winBy - 1)
    ) {
      if (top > 0 && topWinBy <= winBy - 1) {
        top -= 1;
        topWinBy += 1;
        console.log(1, "verticalTop");
      }
      if (bottom < boardSize - 1 && bottomWinBy <= winBy - 1) {
        console.log(1, "verticalBottom");
        bottom += 1;
        bottomWinBy += 1;
      }
    }
    let concurrentValue = 0;
    for (let i = top; i <= bottom; i++) {
      console.log(1, "verticalFor");

      if (playerNumber !== board[i][tileIdx]) {
        concurrentValue = 0;
        continue;
      }

      concurrentValue += 1;
      if (concurrentValue === winBy) {
        return true;
      }
    }
  };
  const checkDiagonal = (winBy: number) => {
    let left = [rowIdx, tileIdx];
    let right = [rowIdx, tileIdx];
    let leftWinBy = 0;
    let rightWinBy = 0;
    while (
      (left[0] > 0 &&
        left[1] > 0 &&
        left[0] < boardSize - 1 &&
        left[1] < boardSize - 1 &&
        leftWinBy <= winBy-1) ||
      (right[0] > 0 &&
        right[1] > 0 &&
        right[0] < boardSize - 1 &&
        right[1] < boardSize - 1 &&
        rightWinBy <= winBy-1)
    ) {
      if (
        left[0] > 0 &&
        left[1] > 0 &&
        left[0] < boardSize - 1 &&
        left[1] < boardSize - 1 &&
        leftWinBy <= winBy-1
      ) {
        left[0] += 1;
        left[1] -= 1;
        leftWinBy += 1;
      }
      if (
        right[0] > 0 &&
        right[1] > 0 &&
        right[0] < boardSize - 1 &&
        right[1] < boardSize - 1 &&
        rightWinBy <= winBy-1
      ) {
        right[0] -= 1;
        right[1] += 1;
        rightWinBy += 1;
      }
    }
    let j = right[1];
    let concurrentValue = 0;
    for (let i = right[0]; i <= left[0]; i++) {
      console.log(board[i][j], "diagonol");
      if (playerNumber !== board[i][j]) {
        concurrentValue = 0;
        j -= 1;
        continue;
      }
      j -= 1;
      concurrentValue += 1;
      if (concurrentValue === winBy) {
        return true;
      }
    }
    left = [rowIdx, tileIdx];
    right = [rowIdx, tileIdx];
    leftWinBy = 0;
    rightWinBy = 0;

    while (
      (left[0] > 0 &&
        left[1] > 0 &&
        left[0] < boardSize - 1 &&
        left[1] < boardSize - 1 &&
        leftWinBy <= winBy-1) ||
      (right[0] > 0 &&
        right[1] > 0 &&
        right[0] < boardSize - 1 &&
        right[1] < boardSize - 1 &&
        rightWinBy <= winBy-1)
    ) {
      if (
        left[0] > 0 &&
        left[1] > 0 &&
        left[0] < boardSize - 1 &&
        left[1] < boardSize - 1 &&
        leftWinBy <= winBy-1
      ) {
        left[0] -= 1;
        left[1] -= 1;
        leftWinBy += 1;
      }
      if (
        right[0] > 0 &&
        right[1] > 0 &&
        right[0] < boardSize - 1 &&
        right[1] < boardSize - 1 &&
        rightWinBy <= winBy-1
      ) {
        right[0] += 1;
        right[1] += 1;
        rightWinBy += 1;
      }
    }
    j = right[1];
    concurrentValue = 0;
    for (let i = right[0]; i >= left[0]; i--) {
      console.log(board[i][j], "diagonol");
      if (playerNumber !== board[i][j]) {
        concurrentValue = 0;
        j -= 1;
        continue;
      }
      j -= 1;
      concurrentValue += 1;
      if (concurrentValue === winBy) {
        return true;
      }
    }
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
    won:
      checkHorizontal(sessionCookies?.lobby?.board?.winBy) ||
      checkVertical(sessionCookies?.lobby?.board?.winBy) ||
      checkDiagonal(sessionCookies?.lobby?.board?.winBy),
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
