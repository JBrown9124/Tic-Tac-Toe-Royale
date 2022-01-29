import fire from "../img/fire.png";
import bomb from "../img/bomb.jpg"
import mcolbomb from "../img/mcol-bomb.svg"
import { PowerUps } from "../Models/PowerUp";
export const powerUps: PowerUps = {
  "1": {
    name: "fire",
    description:
      "Place on an empty tile next to any tile you own. Last for 2 turns. If players move onto this tile their moves will perish",
    imgUrl: fire,
    value: 1,
    rules: {
      affectsCaster: false,
      direction: { isVertical: true, isHorizontal: true, isDiagonal: true },
      castAnywhere: true,
      tilesAffected: 1,
      mustBeEmptyTile: true,
      areaShape: "line",
    },
    selectColor: "#f8bbd0",
    quantity: 0
  },

  "2": {
    name: "cleave",
    description:
      "Slash 3 spaces in any direction from a tile you own. Any moves in the slashes path will be destroyed!",
    imgUrl:
      "https://i1.wp.com/st-central.net/wp-content/uploads/2020/08/icon_global_skill_p_cleave.png?ssl=1",
    value: 2,
    rules: {
      affectsCaster: false,
      direction: { isVertical: true, isHorizontal: true, isDiagonal: false },
      castAnywhere: false,
      tilesAffected: 3,
      mustBeEmptyTile: false,
      areaShape: "line",
    },
    selectColor: "#c8e6c9",
    quantity: 0
  },

  "3": {
    name: "arrow",
    description:
      "Shoot an arrow in any direction from a tile you own. Any moves in the arrows path will be destroyed!",
    imgUrl: "https://cdn.newworldfans.com/db_images/db/items_hires/arrowt4.png",
    value: 3,
    rules: {
      affectsCaster: false,
      direction: { isVertical: true, isHorizontal: true, isDiagonal: true },
      castAnywhere: false,
      tilesAffected: 2,
      mustBeEmptyTile: false,
      areaShape: "line",
    },
    selectColor: "#b2ebf2",
    quantity: 0
  },

  "4": {
    name: "bomb",
    description: "Blow up a 4 square radius on any spot of the board",
    imgUrl:
    mcolbomb,
        value: 4,
    rules: {
      affectsCaster: false,
      direction: { isVertical: true, isHorizontal: true, isDiagonal: true },
      castAnywhere: true,
      tilesAffected: 4,
      mustBeEmptyTile: false,
      areaShape: "square",
    },
    selectColor: "#ffe0b2",
    quantity: 0
  },

  "5": {
    name: "swap",
    description: "Swap with any tile next to one that you own.",
    imgUrl: "https://icon-library.com/images/swap-icon/swap-icon-15.jpg",
    value: 5,
    rules: {
      affectsCaster: true,
      direction: { isVertical: true, isHorizontal: true, isDiagonal: true },
      castAnywhere: false,
      tilesAffected: 1,
      mustBeEmptyTile: false,
      areaShape: "line",
    },
    selectColor: "#e1bee7",
    quantity: 0
  },
};
