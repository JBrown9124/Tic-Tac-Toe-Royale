import { WinningMove } from "../../../Models/Win";
export const isHorizontalWin = (
  winBy: number,
  columnIdx: number,
  rowIdx: number,
  playerId: string,
  board: (string | number)[][],
  boardSize: number,
  winningMoves: WinningMove[]
): boolean => {
  let leftIdx = columnIdx;
  let rightIdx = columnIdx;

  while (leftIdx > 0 && playerId === board[rowIdx][leftIdx - 1]) {
    leftIdx -= 1;
  }

  while (rightIdx < boardSize - 1 && playerId === board[rowIdx][rightIdx + 1]) {
    rightIdx += 1;
  }

  let isWin = rightIdx - leftIdx + 1 >= winBy;
  if (isWin) {
    for (let i = leftIdx; i <= rightIdx; i++)
      winningMoves.push({ rowIdx: rowIdx, columnIdx: i });
  }

  return isWin;
};

export const isVerticalWin = ( winBy: number,
  columnIdx: number,
  rowIdx: number,
  playerId: string,
  board: (string | number)[][],
  boardSize: number,
  winningMoves: WinningMove[]): boolean => {
  let topIdx = rowIdx;
  let bottomIdx = rowIdx;

  while (topIdx > 0 && playerId === board[topIdx - 1][columnIdx]) {
    topIdx -= 1;
  }

  while (
    bottomIdx < boardSize - 1 &&
    playerId === board[bottomIdx + 1][columnIdx]
  ) {
    bottomIdx += 1;
  }

  let isWin = bottomIdx - topIdx + 1 >= winBy;
  if (isWin) {
    for (let i = topIdx; i <= bottomIdx; i++)
      winningMoves.push({ rowIdx: i, columnIdx: columnIdx });
  }

  return isWin;
};
export const isDiagonalLeftWin = ( winBy: number,
  columnIdx: number,
  rowIdx: number,
  playerId: string,
  board: (string | number)[][],
  boardSize: number,
  winningMoves: WinningMove[]) => {
  let left = [rowIdx, columnIdx];
  let right = [rowIdx, columnIdx];
  while (
    left[0] < boardSize - 1 &&
    left[1] > 0 &&
    board[left[0] + 1][left[1] - 1] === playerId
  ) {
    left[0] += 1;
    left[1] -= 1;
  }
  while (
    right[0] > 0 &&
    right[1] < boardSize - 1 &&
    board[right[0] - 1][right[1] + 1] === playerId
  ) {
    right[0] -= 1;
    right[1] += 1;
  }
  let isWin = right[1] - left[1] + 1 >= winBy;
  if (isWin) {
    let j = left[0];
    for (let i = left[1]; i <= right[1]; i++) {
      winningMoves.push({ rowIdx: j, columnIdx: i });
      j -= 1;
    }
  }

  return isWin;
};
export const isDiagonalRightWin = ( winBy: number,
  columnIdx: number,
  rowIdx: number,
  playerId: string,
  board: (string | number)[][],
  boardSize: number,
  winningMoves: WinningMove[]) => {
  let left = [rowIdx, columnIdx];
  let right = [rowIdx, columnIdx];
  while (
    right[0] < boardSize - 1 &&
    right[1] < boardSize - 1 &&
    board[right[0] + 1][right[1] + 1] === playerId
  ) {
    right[0] += 1;
    right[1] += 1;
  }
  while (
    left[0] > 0 &&
    left[1] > 0 &&
    board[left[0] - 1][left[1] - 1] === playerId
  ) {
    left[0] -= 1;
    left[1] -= 1;
  }
  let isWin = right[1] - left[1] + 1 >= winBy;
  if (isWin) {
    let j = left[0];
    for (let i = left[1]; i <= right[1]; i++) {
      winningMoves.push({ rowIdx: j, columnIdx: i });
      j += 1;
    }
  }

  return isWin;
};
