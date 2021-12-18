import { RgbaColor } from "react-colorful";
import {NewMove} from './NewMove'
export interface Board{
    color:RgbaColor,
    size:number,
    winBy:number,
    moves:NewMove[]
}