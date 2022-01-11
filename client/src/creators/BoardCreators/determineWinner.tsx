import makeNewMove from "../APICreators/makeNewMove";
import { Lobby } from "../../Models/Lobby";
import { NewMove } from "../../Models/NewMove";
import { WinningMove } from "../../Models/Win";
import { GameStatus } from "../../Models/GameStatus";
const determineWinner = async (
  rowIdx: number,
  tileIdx: number,
  board: (number|string)[][],
  boardSize: number,
  playerId: string,

  winBy:number,
  lobbyId:number,
  lobbyHostSid: number,
  setGameStatus: (gameStatus:GameStatus)=>void,
  
) => {
  board[rowIdx][tileIdx] = playerId;
  let winningMoves: WinningMove[] = [];
  const checkHorizontal = (winBy: number): boolean => {
    let leftIdx = tileIdx;
    let rightIdx = tileIdx;

    while (leftIdx > 0 && playerId === board[rowIdx][leftIdx - 1]) {
      leftIdx -= 1;
    }

    while (
      rightIdx < boardSize - 1 &&
      playerId === board[rowIdx][rightIdx + 1]
    ) {
      rightIdx += 1;
    }

    let isWin = rightIdx - leftIdx + 1 >= winBy;
    if (isWin) {
      for (let i = leftIdx; i <= rightIdx; i++)
        winningMoves.push({ rowIdx: rowIdx, tileIdx: i });
    }

    return isWin;
  };

  const checkVertical = (winBy: number): boolean => {
    let topIdx = rowIdx;
    let bottomIdx = rowIdx;

    while (topIdx > 0 && playerId === board[topIdx - 1][tileIdx]) {
      topIdx -= 1;
    }

    while (
      bottomIdx < boardSize - 1 &&
      playerId === board[bottomIdx + 1][tileIdx]
    ) {
      bottomIdx += 1;
    }

    let isWin = bottomIdx - topIdx + 1 >= winBy;
    if (isWin) {
      for (let i = topIdx; i <= bottomIdx; i++)
        winningMoves.push({ rowIdx: i, tileIdx: tileIdx });
    }

    return isWin;
  };
  const checkDiagonalLeft = (winBy: number) => {
    let left = [rowIdx, tileIdx];
    let right = [rowIdx, tileIdx];
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
        winningMoves.push({ rowIdx: j, tileIdx: i });
        j -= 1;
      }
    }

    return isWin;
  };
  const checkDiagonalRight = (winBy: number) => {
    let left = [rowIdx, tileIdx];
    let right = [rowIdx, tileIdx];
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
        winningMoves.push({ rowIdx: j, tileIdx: i });
        j += 1;
      }
    }

    return isWin;
  };

  const win = checkHorizontal(winBy)
    ? "horizontal"
    : checkVertical(winBy)
    ? "vertical"
    : checkDiagonalRight(winBy)
    ? "diagonalRight"
    : checkDiagonalLeft(winBy)
    ? "diagonalLeft"
    : null;
  let boardMove: NewMove = {
    rowIdx: rowIdx,
    tileIdx: tileIdx,
    win: {
      type: typeof win === "string" ? win : null,
      whoWon: typeof win === "string" ? playerId : null,
      winningMoves: typeof win === "string" ? winningMoves : null,
    },
    playerId: playerId,
  };

  const reqBody = {
    lobbyId: lobbyId,
    newMove: boardMove,
    hostSid: lobbyHostSid,
  };
  const gameStatusResponse = await makeNewMove(reqBody);
  if (gameStatusResponse){
  setGameStatus({
    win: gameStatusResponse.win,
    whoTurn: gameStatusResponse.whoTurn,
  });}
};
export default determineWinner;
