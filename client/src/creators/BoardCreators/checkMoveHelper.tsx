import {NewMove} from "../../Models/NewMove"
export const checkHorizontal = (
    distance: number,
    rowIdx: number,
    tileIdx: number,
    boardSize: number,
    playerId: string,
    board: (number | string)[][],
    firstSelect: NewMove
  ) => {
  let leftIdx = tileIdx;
  let rightIdx = tileIdx;
  const requiredDistance = Math.ceil(distance/2)
  let newSelectedMoves =[]
  while (leftIdx+distance < boardSize - 1  && firstSelect.rowIdx===rowIdx &&firstSelect.tileIdx === leftIdx-1) {
    leftIdx -= 1;
  }

  while (rightIdx < boardSize - 1 && playerId !== board[rowIdx][rightIdx + 1]) {
    rightIdx += 1;
  }

  let isSafe = rightIdx
  
  
};

export const checkVertical = (
    distance: number,
    rowIdx: number,
    tileIdx: number,
    boardSize: number,
    playerId: string,
    board: (number | string)[][],
    firstSelect: NewMove
  ) => {
  let topIdx = rowIdx;
  let bottomIdx = rowIdx;
  const requiredDistance = Math.ceil(distance/2)
  while (topIdx > 0 && playerId === board[topIdx - 1][tileIdx]) {
    topIdx -= 1;
  }

  while (
    bottomIdx < boardSize - 1 &&
    playerId === board[bottomIdx + 1][tileIdx]
  ) {
    bottomIdx += 1;
  }

 
 
  
};
export const checkDiagonalLeft = (
    distance: number,
    rowIdx: number,
    tileIdx: number,
    boardSize: number,
    playerId: string,
    board: (number | string)[][],
    firstSelect: NewMove
  ) => {
  let left = [rowIdx, tileIdx];
  let right = [rowIdx, tileIdx];
  const requiredDistance = Math.ceil(distance/2)
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
 
 

};
export const checkDiagonalRight = (
  distance: number,
  rowIdx: number,
  tileIdx: number,
  boardSize: number,
  playerId: string,
  board: (number | string)[][],
  firstSelect: NewMove
) => {
  let left = [rowIdx, tileIdx];
  let right = [rowIdx, tileIdx];
  const requiredDistance = Math.ceil(distance/2)
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
  
};
