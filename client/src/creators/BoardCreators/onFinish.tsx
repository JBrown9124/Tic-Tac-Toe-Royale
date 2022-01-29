import { PowerUp, PowerUps } from "../../Models/PowerUp";
import { GameStatus } from "../../Models/GameStatus";
import { Move } from "../../Models/Move";
import { Lobby } from "../../Models/Lobby";
import { WinningMove } from "../../Models/Win";
import {
  isHorizontalWin,
  isVerticalWin,
  isDiagonalLeftWin,
  isDiagonalRightWin,
} from "./determineWinner/isWinHelpers";
import makeNewMove from "../APICreators/makeNewMove";
const onFinish = async (
  selectedPowerUp: PowerUp,
  gameStatus: GameStatus,
  selectedPowerUpTiles: Move[],
  lobby: Lobby,
  inventory: PowerUps,
  setSelectedPowerUpTiles: (selectedPowerUpTiles: Move[]) => void,
  setSelectedPowerUp: (selectedPowerUp: PowerUp) => void,
  setIsUsingPowerUp: (isUsingPowerUp: boolean) => void,
  setGameStatus: (gameStatus: GameStatus) => void,
  board: (number | string)[][]
) => {
  let newGameStatus = gameStatus;

  if (selectedPowerUp.name === "cleave" || selectedPowerUp.name === "arrow") {
    selectedPowerUpTiles.shift();
  }

  if (selectedPowerUp.name === "swap") {
    const playerMoveUsingSwap: Move = selectedPowerUpTiles[0];
    const selectedPlayerSwapMove: Move = selectedPowerUpTiles[1];
    let boardClone: (string | number)[][] = [...board];
    [
      boardClone[playerMoveUsingSwap.rowIdx][playerMoveUsingSwap.tileIdx],
      boardClone[selectedPlayerSwapMove.rowIdx][selectedPlayerSwapMove.tileIdx],
    ] = [
      boardClone[selectedPlayerSwapMove.rowIdx][selectedPlayerSwapMove.tileIdx],
      boardClone[playerMoveUsingSwap.rowIdx][playerMoveUsingSwap.tileIdx],
    ];

    let winningMoves: WinningMove[] = [];

    const win = isHorizontalWin(
      lobby.board.winBy,
      selectedPlayerSwapMove.tileIdx,
      selectedPlayerSwapMove.rowIdx,
      playerMoveUsingSwap.playerId,
      boardClone,
      lobby.board.size,
      winningMoves
    )
      ? "horizontal"
      : isVerticalWin(
          lobby.board.winBy,
          selectedPlayerSwapMove.tileIdx,
          selectedPlayerSwapMove.rowIdx,
          playerMoveUsingSwap.playerId,
          boardClone,
          lobby.board.size,
          winningMoves
        )
      ? "vertical"
      : isDiagonalRightWin(
          lobby.board.winBy,
          selectedPlayerSwapMove.tileIdx,
          selectedPlayerSwapMove.rowIdx,
          playerMoveUsingSwap.playerId,
          boardClone,
          lobby.board.size,
          winningMoves
        )
      ? "diagonalRight"
      : isDiagonalLeftWin(
          lobby.board.winBy,
          selectedPlayerSwapMove.tileIdx,
          selectedPlayerSwapMove.rowIdx,
          playerMoveUsingSwap.playerId,
          boardClone,
          lobby.board.size,
          winningMoves
        )
      ? "diagonalLeft"
      : null;
    newGameStatus = {
      win: {
        type: typeof win === "string" ? win : null,
        whoWon: typeof win === "string" ? playerMoveUsingSwap.playerId : null,
        winningMoves: typeof win === "string" ? winningMoves : null,
      },
      newMove: { rowIdx: 0, tileIdx: 0, playerId: "" },
      whoTurn: playerMoveUsingSwap.playerId,
      newPowerUpUse: {
        powerUp: selectedPowerUp,
        selectedPowerUpTiles: selectedPowerUpTiles,
      },
    };
  }
  newGameStatus.newPowerUpUse.powerUp = selectedPowerUp;
  newGameStatus.newPowerUpUse.selectedPowerUpTiles = selectedPowerUpTiles;
  newGameStatus.newMove.playerId = "";
  const reqBody = {
    lobbyId: lobby.lobbyId,
    hostSid: lobby.hostSid,
    gameStatus: newGameStatus,
  };

  const gameStatusResponse = await makeNewMove(reqBody);
  if (gameStatusResponse) {
    const powerUpKey = String(selectedPowerUp.value);
    inventory[powerUpKey].quantity -= 1;
    setSelectedPowerUpTiles([]);
    setSelectedPowerUp({
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
    });
    setIsUsingPowerUp(false);
    setGameStatus(gameStatusResponse);
  }
};
export default onFinish;
