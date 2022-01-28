import { Move } from "../../Models/Move";
export const checkHorizontal = async (
  distance: number,
  rowIdx: number,
  tileIdx: number,
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
  
  return newSelectedMoves;
};

export const checkVertical = async (
  distance: number,
  rowIdx: number,
  tileIdx: number,
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
  firstSelect: Move
): Promise<Move[]> => {
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

};
export const checkDiagonalRight = async (
  distance: number,
  rowIdx: number,
  tileIdx: number,
  boardSize: number,
  playerId: string,
  board: (number | string)[][],
  firstSelect: Move
): Promise<Move[]> => {
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
  
  return newSelectedMoves;
};
