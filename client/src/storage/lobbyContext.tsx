import {createContext} from 'react'
import {Lobby} from '../Models/Lobby'
const lobby:Lobby = {
    hostSid: 0,
    lobbyId: 0,
    board: { size: 0, color: { r: 0, g: 0, b: 0, a: 0 }, winBy: 3, moves: [] },
    players: [],
    gameStatus: {
      win: { whoWon: null, type: null, winningMoves: null },
      whoTurn: "",
    },
  };

export const LobbyContext=createContext(lobby)