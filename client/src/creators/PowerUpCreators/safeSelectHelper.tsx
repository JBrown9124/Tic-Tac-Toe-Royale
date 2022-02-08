import { Move } from "../../Models/Move";
export const checkHorizontal = async (
  distance: number,
  rowIdx: number,
  columnIdx: number,
  boardSize: number,
  playerId: string,
  board: (number | string)[][],
  firstSelect: Move
): Promise<Move[]> => {
  const requiredDistance = Math.ceil(distance / 2);
  let newSelectedMoves = [];
  //right side
  if (
    firstSelect.rowIdx === rowIdx &&
    firstSelect.columnIdx === columnIdx - 1 &&
    columnIdx + requiredDistance - 1 < boardSize - 1
  ) {
    for (let i = columnIdx; i <= firstSelect.columnIdx + distance; i++) {
      newSelectedMoves.push({ playerId: playerId, columnIdx: i, rowIdx: rowIdx });
    }
  }
  //left side
  if (
    firstSelect.rowIdx === rowIdx &&
    firstSelect.columnIdx === columnIdx + 1 &&
    columnIdx - requiredDistance + 1 > 0
  ) {
    for (let i = columnIdx; i >= firstSelect.columnIdx - distance; i--) {
      newSelectedMoves.push({ playerId: playerId, columnIdx: i, rowIdx: rowIdx });
    }
  }

  return newSelectedMoves;
};

export const checkVertical = async (
  distance: number,
  rowIdx: number,
  columnIdx: number,
  boardSize: number,
  playerId: string,
  board: (number | string)[][],
  firstSelect: Move
): Promise<Move[]> => {
  const requiredDistance = Math.ceil(distance / 2);
  let newSelectedMoves = [];
  //top side
  if (
    firstSelect.rowIdx === rowIdx + 1 &&
    firstSelect.columnIdx === columnIdx &&
    rowIdx - requiredDistance + 1 > 0
  ) {
    for (let i = rowIdx; i >= firstSelect.rowIdx - distance; i--) {
      newSelectedMoves.push({
        playerId: playerId,
        columnIdx: columnIdx,
        rowIdx: i,
      });
    }
  }
  //bottom side
  if (
    firstSelect.rowIdx === rowIdx - 1 &&
    firstSelect.columnIdx === columnIdx &&
    rowIdx + requiredDistance - 1 < boardSize - 1
  ) {
    for (let i = rowIdx; i <= firstSelect.rowIdx + distance; i++) {
      newSelectedMoves.push({
        playerId: playerId,
        columnIdx: columnIdx,
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
  columnIdx: number,
  boardSize: number,
  playerId: string,
  board: (number | string)[][],
  firstSelect: Move
): Promise<Move[]> => {
  let left = [rowIdx, columnIdx];
  let right = [rowIdx, columnIdx];
  const requiredDistance = Math.ceil(distance / 2);
  let newSelectedMoves = [];
  if (
    firstSelect.rowIdx === rowIdx + 1 &&
    firstSelect.columnIdx === columnIdx + 1 &&
    columnIdx - requiredDistance + 1 > 0 &&
    rowIdx - requiredDistance + 1 > 0
  ) {
    let j = columnIdx;
    for (let i = rowIdx; i >= firstSelect.rowIdx - distance; i--) {
      newSelectedMoves.push({
        playerId: playerId,
        columnIdx: j,
        rowIdx: i,
      });
      j -= 1;
    }
  }
  if (
    firstSelect.rowIdx === rowIdx - 1 &&
    firstSelect.columnIdx === columnIdx - 1 &&
    columnIdx + requiredDistance - 1 < boardSize - 1 &&
    rowIdx + requiredDistance - 1 < boardSize - 1
  ) {
    let j = columnIdx;
    for (let i = rowIdx; i <= firstSelect.rowIdx + distance; i++) {
      newSelectedMoves.push({
        playerId: playerId,
        columnIdx: j,
        rowIdx: i,
      });
      j += 1;
    }
  }
  return newSelectedMoves;
};
export const checkDiagonalRight = async (
  distance: number,
  rowIdx: number,
  columnIdx: number,
  boardSize: number,
  playerId: string,
  board: (number | string)[][],
  firstSelect: Move
): Promise<Move[]> => {
  let left = [rowIdx, columnIdx];
  let right = [rowIdx, columnIdx];
  const requiredDistance = Math.ceil(distance / 2);
  let newSelectedMoves = [];
  if (
    firstSelect.rowIdx === rowIdx + 1 &&
    firstSelect.columnIdx === columnIdx - 1 &&
    columnIdx + requiredDistance - 1 < boardSize - 1 &&
    rowIdx - requiredDistance + 1 > 0
  ) {
    let j = columnIdx;
    for (let i = rowIdx; i >= firstSelect.rowIdx - distance; i--) {
      newSelectedMoves.push({
        playerId: playerId,
        columnIdx: j,
        rowIdx: i,
      });
      j += 1;
    }
  }
  if (
    firstSelect.rowIdx === rowIdx - 1 &&
    firstSelect.columnIdx === columnIdx + 1 &&
    columnIdx - requiredDistance+1 > 0 &&
    rowIdx + requiredDistance < boardSize - 1
  ) {
    let j = columnIdx;
    for (let i = rowIdx; i <= firstSelect.rowIdx + distance; i++) {
      newSelectedMoves.push({
        playerId: playerId,
        columnIdx: j,
        rowIdx: i,
      });
      j -= 1;
    }
  }

  return newSelectedMoves;
};
