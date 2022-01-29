import { RgbaColor } from "react-colorful";
import {Move} from './Move'
export interface Board{
    color:RgbaColor,
    size:number,
    winBy:number,
    moves:Move[]
}