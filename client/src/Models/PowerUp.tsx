import { Move } from "./Move";
export interface PowerUps {
  [key: string]: {
    name: string;
    imgUrl: string;
    value: number;
    description: string;
    rules: PowerUpRules;
    selectColor: string;
    quantity: number;
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
  areaShape:string
}
export interface PowerUp {
  
  name: string;
  imgUrl: string;
  value: number;
  description: string;
  rules: PowerUpRules;
  selectColor: string;
  quantity:number
}
export interface PowerUps{

}

