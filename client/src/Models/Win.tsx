import {NewMove} from './NewMove';
export interface Win{
    whoWon:number|null,
    type:string|null,
    winningMoves:WinningMove[]|null
}
export interface WinningMove{
    rowIdx:number,
    tileIdx:number
}