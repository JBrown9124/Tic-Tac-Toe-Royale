export const defaultPowerUp = {
    value: 0,
    name: "",
    description: "",
    imgUrl: "",

    rules: {
      affectsCaster: false,
      direction: { isVertical: false, isHorizontal: false, isDiagonal: false },
      castAnywhere: false,
      tilesAffected: 0,
      mustBeEmptyTile: false,
      areaShape: "line",
    },
    selectColor: "",
    quantity: 0,
  }