import newMove from "./newMove";
import { Lobby } from "../Models/Lobby";
import { GameStatus } from "../Models/GameStatus";
const determineWinner = (
  rowIdx: number,
  tileIdx: number,
  board: number[][],
  boardSize: number,
  playerNumber: number,
  lobby: Lobby,
  setGameStatus: Function,
  gameStatus: GameStatus
) => {
  board[rowIdx][tileIdx] = playerNumber;

  const checkHorizontal = (winBy: number) => {
    console.log(board[rowIdx][tileIdx], "HorizontalMove");
    let leftIdx = tileIdx;
    let rightIdx = tileIdx;

    while (leftIdx > 0 && playerNumber === board[rowIdx][leftIdx - 1]) {
      leftIdx -= 1;
    }
    console.log(leftIdx, "HorizontalLeft");
    while (
      rightIdx < boardSize - 1 &&
      playerNumber === board[rowIdx][rightIdx + 1]
    ) {
      rightIdx += 1;
    }
    console.log(rightIdx, "HorizontalRight");
    console.log(rightIdx - leftIdx + 1, "HorizontalDistance");
    let isWin = rightIdx - leftIdx + 1 >= winBy;
    console.log(isWin, "isHorizontalWin");
    return isWin;
  };
  //   let left = tileIdx;
  //   let right = tileIdx;
  //   let leftCount = 0;
  //   let rightCount = 0;
  //   let consecutiveValue = 0;
  //   while (
  //     (left > 0 && leftCount <= winBy - 1) ||
  //     (right < boardSize - 1 && rightCount <= winBy - 1)
  //   ) {

  //     if (left > 0 && leftCount <= winBy) {
  //       left -= 1;
  //       leftCount += 1;
  //       if (board[rowIdx][left] === board[rowIdx][left - 1]) {
  //         consecutiveValue += 1;
  //       } else if (board[rowIdx][left] !== board[rowIdx][left - 1]) {
  //         consecutiveValue = 0;
  //       }
  //       console.log(0, "horizontalLeft");
  //     }
  //     if (right < boardSize - 1 && rightCount <= winBy - 1) {
  //       right += 1;
  //       rightCount += 1;
  //       if (board[rowIdx][right] === board[rowIdx][right - 1]) {
  //         consecutiveValue += 1;
  //       } else if (board[rowIdx][right] !== board[rowIdx][right - 1]) {
  //         consecutiveValue = 0;
  //       }
  //       console.log(0, "horizontalLeft");
  //     }
  //     if (consecutiveValue-2 >= winBy) {
  //       return true;
  //     }
  //   }
  // };
  // for (let i = left; i <= right; i++) {
  //   console.log(0, "horziontalFor");

  //   if (playerNumber !== board[rowIdx][i]) {
  //     consecutiveValue = 0;
  //     continue;
  //   }

  //   consecutiveValue += 1;
  //   if (consecutiveValue === winBy) {
  //     return true;
  //   }
  // }

  const checkVertical = (winBy: number) => {
    console.log(board[rowIdx][tileIdx], "VerticalMove");
    let topIdx = rowIdx;
    let bottomIdx = rowIdx;

    while (topIdx > 0 && playerNumber === board[topIdx - 1][tileIdx]) {
      topIdx -= 1;
    }
    console.log(topIdx, "VerticalTop");
    while (
      bottomIdx < boardSize - 1 &&
      playerNumber === board[bottomIdx + 1][tileIdx]
    ) {
      bottomIdx += 1;
    }
    console.log(bottomIdx, "VerticalBottom");
    console.log(bottomIdx - topIdx + 1, "VerticalDistance");
    let isWin = bottomIdx - topIdx + 1 >= winBy;
    console.log(isWin, "isVerticalWin");
    return isWin;
  };
  const checkDiagonal = (winBy: number) => {
    let left = [rowIdx, tileIdx];
    let right = [rowIdx, tileIdx];
    let leftCount = 0;
    let rightCount = 0;
    while (
      (left[0] > 0 &&
        left[1] > 0 &&
        left[0] < boardSize - 1 &&
        left[1] < boardSize - 1 &&
        leftCount <= winBy - 1) ||
      (right[0] > 0 &&
        right[1] > 0 &&
        right[0] < boardSize - 1 &&
        right[1] < boardSize - 1 &&
        rightCount <= winBy - 1)
    ) {
      if (
        left[0] > 0 &&
        left[1] > 0 &&
        left[0] < boardSize - 1 &&
        left[1] < boardSize - 1 &&
        leftCount <= winBy - 1
      ) {
        left[0] += 1;
        left[1] -= 1;
        leftCount += 1;
      }
      if (
        right[0] > 0 &&
        right[1] > 0 &&
        right[0] < boardSize - 1 &&
        right[1] < boardSize - 1 &&
        rightCount <= winBy - 1
      ) {
        right[0] -= 1;
        right[1] += 1;
        rightCount += 1;
      }
    }
    let j = right[1];
    let consecutiveValue = 0;
    for (let i = right[0]; i <= left[0]; i++) {
      console.log(board[i][j], "diagonol");
      if (playerNumber !== board[i][j]) {
        consecutiveValue = 0;
        j -= 1;
        continue;
      }
      j -= 1;
      consecutiveValue += 1;
      if (consecutiveValue === winBy) {
        return true;
      }
    }
    left = [rowIdx, tileIdx];
    right = [rowIdx, tileIdx];
    leftCount = 0;
    rightCount = 0;

    while (
      (left[0] > 0 &&
        left[1] > 0 &&
        left[0] < boardSize - 1 &&
        left[1] < boardSize - 1 &&
        leftCount <= winBy - 1) ||
      (right[0] > 0 &&
        right[1] > 0 &&
        right[0] < boardSize - 1 &&
        right[1] < boardSize - 1 &&
        rightCount <= winBy - 1)
    ) {
      if (
        left[0] > 0 &&
        left[1] > 0 &&
        left[0] < boardSize - 1 &&
        left[1] < boardSize - 1 &&
        leftCount <= winBy - 1
      ) {
        left[0] -= 1;
        left[1] -= 1;
        leftCount += 1;
      }
      if (
        right[0] > 0 &&
        right[1] > 0 &&
        right[0] < boardSize - 1 &&
        right[1] < boardSize - 1 &&
        rightCount <= winBy - 1
      ) {
        right[0] += 1;
        right[1] += 1;
        rightCount += 1;
      }
    }
    j = right[1];
    consecutiveValue = 0;
    for (let i = right[0]; i >= left[0]; i--) {
      console.log(board[i][j], "diagonol");
      if (playerNumber !== board[i][j]) {
        consecutiveValue = 0;
        j -= 1;
        continue;
      }
      j -= 1;
      consecutiveValue += 1;
      if (consecutiveValue === winBy) {
        return true;
      }
    }
  };

  let boardMove = {
    rowIdx: rowIdx,
    tileIdx: tileIdx,
    won:
      checkHorizontal(lobby?.board?.winBy) ||
      checkVertical(lobby?.board?.winBy) ||
      checkDiagonal(lobby?.board?.winBy),
    playerNumber: playerNumber,
  };

  const reqBody = {
    lobbyId: lobby?.lobbyId,
    newMove: boardMove,
    hostSid: lobby?.hostSid,
  };
  newMove(reqBody);
  setGameStatus({
    whoWon: boardMove.won && playerNumber,
    whoTurn: lobby.players.length === playerNumber ? 1 : gameStatus.whoTurn + 1,
  });

  // if (sessionCookies?.boardMoves !==undefined){
  //   setSessionCookies("boardMoves",[...sessionCookies.boardMoves, boardMove], {path:"/"})}
  // else{ setSessionCookies("boardMoves",[], {path:"/"})}
};
export default determineWinner;
