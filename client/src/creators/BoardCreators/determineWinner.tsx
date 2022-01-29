import makeMove from "../APICreators/makeNewMove";
import { Lobby } from "../../Models/Lobby";
import { Move } from "../../Models/Move";
import { WinningMove } from "../../Models/Win";
import { GameStatus } from "../../Models/GameStatus";
import { PowerUps, PowerUp } from "../../Models/PowerUp";
import { Player } from "../../Models/Player";
import { powerUps } from "../../storage/powerUps";
import { v4 as uuidv4 } from "uuid";
const determineWinner = async (
  rowIdx: number,
  tileIdx: number,
  board: (number | string)[][],
  boardSize: number,
  playerId: string,

  winBy: number,
  lobbyId: number,
  lobbyHostSid: number,
  setGameStatus: (gameStatus: GameStatus) => void,
  inventory: PowerUps
) => {
  let newPowerUp = null;
  let newPowerUpKey = null;
  if (board[rowIdx][tileIdx] > 0) {
    const powerUpKey: string = String(board[rowIdx][tileIdx]);
    // newPowerUp = { ...powerUps[powerUpKey], id: uuidv4() };
    newPowerUp = powerUps[powerUpKey];
    newPowerUpKey = powerUpKey;
    // console.log("newPowerUp:", newPowerUp);
  }
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
  let newGameStatus: GameStatus = {
    win: {
      type: typeof win === "string" ? win : null,
      whoWon: typeof win === "string" ? playerId : null,
      winningMoves: typeof win === "string" ? winningMoves : null,
    },
    newMove: { rowIdx: rowIdx, tileIdx: tileIdx, playerId: playerId },
    whoTurn: playerId,
    newPowerUpUse: {
      powerUp: {
        value: 0,
        name: "",
        description: "",
        imgUrl: "",
        
        rules: {
          affectsCaster: false,
          direction: {
            isVertical: false,
            isHorizontal: false,
            isDiagonal: false,
          },
          castAnywhere: false,
          tilesAffected: 0,
          mustBeEmptyTile: false,
          areaShape: "line",
        },
        selectColor: "",
        quantity:0,
      },
      selectedPowerUpTiles: [],
    },
  };

  const reqBody = {
    powerUp: newPowerUp,
    lobbyId: lobbyId,
    gameStatus: newGameStatus,
    hostSid: lobbyHostSid,
  };
  if (newPowerUpKey && newGameStatus.whoTurn.substring(0, 3) !== "BOT") {
    inventory[newPowerUpKey].quantity += 1;
  }
  const gameStatusResponse = await makeMove(reqBody);
  if (gameStatusResponse) {
    setGameStatus(gameStatusResponse);
  }
};
export default determineWinner;
