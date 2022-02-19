import fire from "../img/fire.png";
import bomb from "../img/bomb.jpg";
import mcolbomb from "../img/mcol-bomb.svg";
import bow from "../img/bow.png";
import { PowerUps } from "../Models/PowerUp";
export const powerUps: PowerUps = {
  "1": {
    name: "fire",
    cursorUrl:"http://www.rw-designer.com/cursor-view/53133.png",
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
    cursorUrl:"http://www.rw-designer.com/cursor-view/111961.png",
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
    cursorUrl:"http://www.rw-designer.com/cursor-view/77464.png",
    description:
      "Select a tile you own. Then select a tile in any direction next to your currently selected tile. Any tiles in the arrows 2 tile range will be destroyed!",
    imgUrl: bow ,

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
    cursorUrl:"http://www.rw-designer.com/cursor-view/97214.png",
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
  //   name: "blind",
  //   description:
  //     "Blind all players until your next turn.",
  //   imgUrl: "https://static.thenounproject.com/png/18405-200.png",
  //   value: 5,
  //   rules: {
  //     affectsCaster: false,
  //     direction: { isVertical: false, isHorizontal: false, isDiagonal: false },
  //     castAnywhere: true,
  //     tilesAffected: 0,
  //     mustBeEmptyTile: false,
  //     areaShape: "debuff",
  //   },
  //   selectColor: "#ffe0b2",
  //   quantity: 0,
  // },

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

export const powerUpsList=[ {
  name: "fire",
  cursorUrl:"http://www.rw-designer.com/cursor-view/53133.png",
  description:
    "Select any empty tile on the board. Spreads and destroys player owned tiles until the root of it is destroyed.",
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

{
  name: "cleave",
  cursorUrl:"http://www.rw-designer.com/cursor-view/111961.png",
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

{
  name: "arrow",
  cursorUrl:"http://www.rw-designer.com/cursor-view/77464.png",
  description:
    "Select a tile you own. Then select a tile in any direction next to your currently selected tile. Any tiles in the arrows 2 tile range will be destroyed!",
  imgUrl: bow ,

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

 {
  name: "bomb",
  cursorUrl:"http://www.rw-designer.com/cursor-view/97214.png",
  description: "Click any spot on the board to destroy a 4 square radius.",
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
}]