import fire from "../img/fire.png";
import bomb from "../img/bomb.jpg";
import mcolbomb from "../img/mcol-bomb.svg";
import { PowerUps } from "../Models/PowerUp";
export const powerUps: PowerUps = {
  "1": {
    name: "fire",
    description:
      "Place on an any empty tile. Spreads and destroys player owned tiles until the root of it is destroyed.",
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
    quantity: 0,
  },

  "2": {
    name: "cleave",
    description:
      "Select a tile you own. Then select a tile in any direction next to your currently selected tile. Any tiles in the cleaves 3 tile range will be destroyed!",
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
    quantity: 0,
  },

  "3": {
    name: "arrow",
    description:
      "Select a tile you own. Then select a tile in any direction next to your currently selected tile. Any tiles in the arrows 2 tile range will be destroyed!",
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
    quantity: 0,
  },

  "4": {
    name: "bomb",
    description: "Destroy a 4 square radius on any spot of the board.",
    imgUrl: mcolbomb,
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
    quantity: 0,
  },

  // "5": {
  //   name: "swap",
  //   description: "Select two other player's tiles. The selected tiles placements will be swapped.",
  //   imgUrl: "https://icon-library.com/images/swap-icon/swap-icon-15.jpg",
  //   value: 5,
  //   rules: {
  //     affectsCaster: true,
  //     direction: { isVertical: true, isHorizontal: true, isDiagonal: true },
  //     castAnywhere: false,
  //     tilesAffected: 1,
  //     mustBeEmptyTile: false,
  //     areaShape: "line",
  //   },
  //   selectColor: "#e1bee7",
  //   quantity: 0,
  // },
};
