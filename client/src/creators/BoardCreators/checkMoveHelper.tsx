import { NewMove } from "../../Models/NewMove";
export const checkHorizontal = async (
  distance: number,
  rowIdx: number,
  tileIdx: number,
  boardSize: number,
  playerId: string,
  board: (number | string)[][],
  firstSelect: NewMove
): Promise<NewMove[]> => {
  let leftIdx = tileIdx;
  let rightIdx = tileIdx;
  const requiredDistance = Math.ceil(distance / 2);
  let newSelectedMoves = [];
  //right side
  if (
    firstSelect.rowIdx === rowIdx &&
    firstSelect.tileIdx === tileIdx - 1 &&
    tileIdx + requiredDistance < boardSize - 1
  ) {
    for (let i = tileIdx; i <= firstSelect.tileIdx + distance; i++) {
      newSelectedMoves.push({ playerId: playerId, tileIdx: i, rowIdx: rowIdx });
    }
  }
  //left side
  if (
    firstSelect.rowIdx === rowIdx &&
    firstSelect.tileIdx === tileIdx + 1 &&
    tileIdx - requiredDistance > 0
  ) {
    for (let i = tileIdx; i >= firstSelect.tileIdx - distance; i--) {
      newSelectedMoves.push({ playerId: playerId, tileIdx: i, rowIdx: rowIdx });
    }
  }
  // while (leftIdx+distance < boardSize - 1  && firstSelect.rowIdx===rowIdx &&firstSelect.tileIdx === leftIdx-1) {
  //   leftIdx -= 1;
  // }

  // while (rightIdx < boardSize - 1 && playerId !== board[rowIdx][rightIdx + 1]) {
  //   rightIdx += 1;
  // }

  // let isSafe = rightIdx
  return newSelectedMoves;
};

export const checkVertical = async (
  distance: number,
  rowIdx: number,
  tileIdx: number,
  boardSize: number,
  playerId: string,
  board: (number | string)[][],
  firstSelect: NewMove
): Promise<NewMove[]> => {
  let topIdx = rowIdx;
  let bottomIdx = rowIdx;

  // while (topIdx > 0 && playerId === board[topIdx - 1][tileIdx]) {
  //   topIdx -= 1;
  // }

  // while (
  //   bottomIdx < boardSize - 1 &&
  //   playerId === board[bottomIdx + 1][tileIdx]
  // ) {
  //   bottomIdx += 1;
  // }
  const requiredDistance = Math.ceil(distance / 2);
  let newSelectedMoves = [];
  //top side
  if (
    firstSelect.rowIdx === rowIdx + 1 &&
    firstSelect.tileIdx === tileIdx &&
    rowIdx - requiredDistance > 0
  ) {
    for (let i = rowIdx; i >= firstSelect.rowIdx - distance; i--) {
      newSelectedMoves.push({
        playerId: playerId,
        tileIdx: tileIdx,
        rowIdx: i,
      });
    }
  }
  //bottom side
  if (
    firstSelect.rowIdx === rowIdx - 1 &&
    firstSelect.tileIdx === tileIdx &&
    rowIdx + requiredDistance < boardSize - 1
  ) {
    for (let i = rowIdx; i <= firstSelect.rowIdx + distance; i++) {
      newSelectedMoves.push({
        playerId: playerId,
        tileIdx: tileIdx,
        rowIdx: i,
      });
    }
  }

  // let isSafe = rightIdx
  return newSelectedMoves;
};
export const checkDiagonalLeft = async (
  distance: number,
  rowIdx: number,
  tileIdx: number,
  boardSize: number,
  playerId: string,
  board: (number | string)[][],
  firstSelect: NewMove
): Promise<NewMove[]> => {
  let left = [rowIdx, tileIdx];
  let right = [rowIdx, tileIdx];
  const requiredDistance = Math.ceil(distance / 2);
  let newSelectedMoves = [];
  if (
    firstSelect.rowIdx === rowIdx + 1 &&
    firstSelect.tileIdx === tileIdx + 1 &&
    tileIdx - requiredDistance > 0 &&
    rowIdx - requiredDistance > 0
  ) {
    let j = tileIdx;
    for (let i = rowIdx; i >= firstSelect.rowIdx - distance; i--) {
      newSelectedMoves.push({
        playerId: playerId,
        tileIdx: j,
        rowIdx: i,
      });
      j -= 1;
    }
  }
  if (
    firstSelect.rowIdx === rowIdx - 1 &&
    firstSelect.tileIdx === tileIdx - 1 &&
    tileIdx + requiredDistance < boardSize - 1 &&
    rowIdx + requiredDistance < boardSize - 1
  ) {
    let j = tileIdx;
    for (let i = rowIdx; i <= firstSelect.rowIdx + distance; i++) {
      newSelectedMoves.push({
        playerId: playerId,
        tileIdx: j,
        rowIdx: i,
      });
      j += 1;
    }
  }
  return newSelectedMoves;
  // while (
  //   right[0] > 0 &&
  //   right[1] < boardSize - 1 &&
  //   board[right[0] - 1][right[1] + 1] === playerId
  // ) {
  //   right[0] -= 1;
  //   right[1] += 1;
  // }
};
export const checkDiagonalRight = async (
  distance: number,
  rowIdx: number,
  tileIdx: number,
  boardSize: number,
  playerId: string,
  board: (number | string)[][],
  firstSelect: NewMove
): Promise<NewMove[]> => {
  let left = [rowIdx, tileIdx];
  let right = [rowIdx, tileIdx];
  const requiredDistance = Math.ceil(distance / 2);
  let newSelectedMoves = [];
  if (
    firstSelect.rowIdx === rowIdx + 1 &&
    firstSelect.tileIdx === tileIdx - 1 &&
    tileIdx + requiredDistance < boardSize - 1 &&
    rowIdx - requiredDistance > 0
  ) {
    let j = tileIdx;
    for (let i = rowIdx; i >= firstSelect.rowIdx - distance; i--) {
      newSelectedMoves.push({
        playerId: playerId,
        tileIdx: j,
        rowIdx: i,
      });
      j += 1;
    }
  }
  if (
    firstSelect.rowIdx === rowIdx - 1 &&
    firstSelect.tileIdx === tileIdx + 1 &&
    tileIdx - requiredDistance > 0 &&
    rowIdx + requiredDistance < boardSize - 1
  ) {
    let j = tileIdx;
    for (let i = rowIdx; i <= firstSelect.rowIdx + distance; i++) {
      newSelectedMoves.push({
        playerId: playerId,
        tileIdx: j,
        rowIdx: i,
      });
      j -= 1;
    }
  }
  // if (
  //   firstSelect.rowIdx === rowIdx - 1 &&
  //   firstSelect.tileIdx === tileIdx - 1 &&
  //   tileIdx + requiredDistance < boardSize - 1 &&
  //   rowIdx + requiredDistance < boardSize - 1
  // ) {
  //   let j = firstSelect.tileIdx;
  //   for (
  //     let i = firstSelect.rowIdx + 1;
  //     i < firstSelect.rowIdx + distance + 1;
  //     i++
  //   ) {
  //     j += 1;
  //     newSelectedMoves.push({
  //       playerId: playerId,
  //       tileIdx: j,
  //       rowIdx: i,
  //     });
  //   }
  // }
  return newSelectedMoves;
};
