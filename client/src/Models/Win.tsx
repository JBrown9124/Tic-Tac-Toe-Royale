import {NewMove} from './NewMove';
export interface Win{
    whoWon:null|string,
    type:string|null,
    winningMoves:WinningMove[]|null
}
export interface WinningMove{
    rowIdx:number,
    tileIdx:number
}