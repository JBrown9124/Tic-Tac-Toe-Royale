import makeMove from "../../APICreators/makeNewMove";
import { Lobby } from "../../../Models/Lobby";
import { Move } from "../../../Models/Move";
import { WinningMove } from "../../../Models/Win";
import { GameStatus } from "../../../Models/GameStatus";
import { PowerUps, PowerUp } from "../../../Models/PowerUp";
import { Player } from "../../../Models/Player";
import { powerUps } from "../../../storage/powerUps";
import {
  isHorizontalWin,
  isVerticalWin,
  isDiagonalRightWin,
  isDiagonalLeftWin,
} from "./isWinHelpers";
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

  const win = isHorizontalWin(
    winBy,
    tileIdx,
    rowIdx,
    playerId,
    board,
    boardSize,
    winningMoves
  )
    ? "horizontal"
    : isVerticalWin(
        winBy,
        tileIdx,
        rowIdx,
        playerId,
        board,
        boardSize,
        winningMoves
      )
    ? "vertical"
    : isDiagonalRightWin(
        winBy,
        tileIdx,
        rowIdx,
        playerId,
        board,
        boardSize,
        winningMoves
      )
    ? "diagonalRight"
    : isDiagonalLeftWin(
        winBy,
        tileIdx,
        rowIdx,
        playerId,
        board,
        boardSize,
        winningMoves
      )
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
        quantity: 0,
      },
      selectedPowerUpTiles: [],
    },  fireTiles:[]
  };

  const reqBody = {
    powerUp: newPowerUp,
    lobbyId: lobbyId,
    gameStatus: newGameStatus,
    hostSid: lobbyHostSid,
  };
  if (inventory && newPowerUpKey && newGameStatus.whoTurn.substring(0, 3) !== "BOT") {
    inventory[newPowerUpKey].quantity += 1;
  }
  const gameStatusResponse = await makeMove(reqBody);
  if (gameStatusResponse) {
    setGameStatus(gameStatusResponse);
  }
};
export default determineWinner;
