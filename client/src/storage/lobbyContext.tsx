import { createContext } from "react";
import { Lobby } from "../Models/Lobby";
const lobby: Lobby = {
  hostSid: 0,
  lobbyId: 0,
  board: { size: 0, color: { r: 0, g: 0, b: 0, a: 0 }, winBy: 3, moves: [] },
  players: [],
  gameStatus: {
    win: { whoWon: null, type: null, winningMoves: null },
    whoTurn: "",
    newMove: { rowIdx: 0, tileIdx: 0, playerId: "" }, newPowerUpUse: {
      powerUp: {
        value: 0,
        name: "",
        description: "",
        imgUrl: "",
      quantity:0,
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
      },
      selectedPowerUpTiles: [],
    },
  },
};

export const LobbyContext = createContext(lobby);
