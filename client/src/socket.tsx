import { io } from "socket.io-client";
import {createContext} from 'react'
import {Cookies } from "react-cookie"
export const socket = io('127.0.0.1:8000');
export const socketContext = createContext(socket)

// socket.on("connect", () => {
//   console.log("connected to server");
//   socket.on("player-join-lobby", (lobby) => {
    
//     console.log(lobby, "SOCKETLOBBY")
        
//   });
//   socket.on("add-user-lobby", (id) => {});
//   socket.on("game-status", (data) => {});
//   socket.on("new-move", (data) => {});
// });

