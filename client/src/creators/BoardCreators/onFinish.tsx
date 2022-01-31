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
  board: (number | string)[][],
  playerId: string
) => {
  let newGameStatus = gameStatus;

  if (selectedPowerUp.name === "cleave" || selectedPowerUp.name === "arrow") {
    selectedPowerUpTiles.shift();
  }

  if (selectedPowerUp.name === "swap") {
    const firstSelectedPlayer: Move = selectedPowerUpTiles[0];
    const secondSelectedPlayer: Move = selectedPowerUpTiles[1];
    let boardClone: (string | number)[][] = [...board];
    [
      boardClone[firstSelectedPlayer.rowIdx][firstSelectedPlayer.tileIdx],
      boardClone[secondSelectedPlayer.rowIdx][secondSelectedPlayer.tileIdx],
    ] = [
      boardClone[secondSelectedPlayer.rowIdx][secondSelectedPlayer.tileIdx],
      boardClone[firstSelectedPlayer.rowIdx][firstSelectedPlayer.tileIdx],
    ];
    let selectedPowerUpTilesClone = [...selectedPowerUpTiles];
    let firstPlayerIdClone = selectedPowerUpTilesClone[0].playerId;
    selectedPowerUpTilesClone[0].playerId = selectedPowerUpTiles[1].playerId;
    selectedPowerUpTilesClone[1].playerId = firstPlayerIdClone;
    let win = null;
    let winningMoves: WinningMove[] = [];
    let whoWon = null;
    selectedPowerUpTilesClone.forEach((tile) => {
      win = isHorizontalWin(
        lobby.board.winBy,
        tile.tileIdx,
        tile.rowIdx,
        tile.playerId,
        boardClone,
        lobby.board.size,
        winningMoves
      )
        ? "horizontal"
        : isVerticalWin(
            lobby.board.winBy,
            tile.tileIdx,
            tile.rowIdx,
            tile.playerId,
            boardClone,
            lobby.board.size,
            winningMoves
          )
        ? "vertical"
        : isDiagonalRightWin(
            lobby.board.winBy,
            tile.tileIdx,
            tile.rowIdx,
            tile.playerId,
            boardClone,
            lobby.board.size,
            winningMoves
          )
        ? "diagonalRight"
        : isDiagonalLeftWin(
            lobby.board.winBy,
            tile.tileIdx,
            tile.rowIdx,
            tile.playerId,
            boardClone,
            lobby.board.size,
            winningMoves
          )
        ? "diagonalLeft"
        : null;
      if (win) {
        whoWon = tile.playerId;
      }
    });
    newGameStatus = {
      win: {
        type: typeof win === "string" ? win : null,
        whoWon: typeof win === "string" ? whoWon : null,
        winningMoves: typeof win === "string" ? winningMoves : null,
      },
      newMove: { rowIdx: 0, tileIdx: 0, playerId: "" },
      whoTurn: playerId,
      newPowerUpUse: {
        powerUp: selectedPowerUp,
        selectedPowerUpTiles: selectedPowerUpTiles,
      },
      fireTiles: [],
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
