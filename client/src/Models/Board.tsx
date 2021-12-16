import { RgbaColor } from "react-colorful";
export interface Board{
    color:RgbaColor,
    size:number,
    winBy:number,
    moves:Object[]
}