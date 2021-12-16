import {Player} from "./Player";
import {Board} from "./Board";
export interface Lobby{
    board:Board,
    players:Player[], 
    lobbyId:number,
    hostSid:number,
}