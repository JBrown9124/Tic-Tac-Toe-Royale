import { Move } from "./Move";
export interface PowerUps {
  [key: string]: {
    name: string;
    imgUrl: string;
    value: number;
    description: string;
    rules: PowerUpRules;
    selectColor: string;
  };
}
export interface PowerUpRules {
  affectsCaster: boolean;
  direction: {
    isVertical: boolean;
    isHorizontal: boolean;
    isDiagonal: boolean;
  };
  castAnywhere: boolean;
  tilesAffected: number;
  mustBeEmptyTile: boolean;
  areaShape:"line"|"square"
}
export interface PowerUp {
  id: string;
  name: string;
  imgUrl: string;
  value: number;
  description: string;
  rules: PowerUpRules;
  selectColor: string;
}


