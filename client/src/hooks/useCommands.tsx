import {useEffect, useState} from "react"
import {Lobby} from "../Models/Lobby"
import {GameStatus} from "../Models/GameStatus"
import createLobby from "../creators/APICreators/createLobby"
import joinLobby from "../creators/APICreators/joinLobby"
import leaveLobby from "../creators/APICreators/leaveLobby"
import getStartGame from "../creators/APICreators/getStartGame"
import getGame from "../creators/APICreators/getGame"
import useSound from 'use-sound'
import { RgbaColor } from "react-colorful";
interface UseCommandsProps{
sessionCookie:any, 
lobby:Lobby,
lobbyId:number
setSessionCookie:Function,
setLobby:(lobby:Lobby)=>void,
setGameStatus:(gameStatus:GameStatus)=>void
setHostColor:(color:RgbaColor)=>void
setHostWinBy:(winBy:number)=>void
setHostSize:(size:number)=>void
setIsLobbyReceived:(isLobbyReceived:boolean)=>void
setPieceSelection:(piece:string)=>void
setIsLobbyFound:(isLobbyFound:boolean)=>void


}

export default function useCommands({sessionCookie, lobbyId, lobby, setSessionCookie, setLobby, setGameStatus, setHostColor,setHostWinBy, setHostSize, setIsLobbyReceived, setPieceSelection, setIsLobbyFound}:UseCommandsProps){
    const [playJoinOrStart] = useSound(
      process.env.PUBLIC_URL + "static/assets/sounds/joinOrStartSound.mp3"
    );
  useEffect(() => {
    if (
      sessionCookie?.command === "create" &&
      parseInt(sessionCookie.lobbyId) === 0
    ) {
      const reqBody = { playerName: sessionCookie?.name };
      createLobby(reqBody).then((response) => {
        if (response) {
          setSessionCookie("lobbyId", response.lobby.lobbyId, { path: "/" });
          setLobby(response.lobby);
          setGameStatus({
            win: { whoWon: null, type: null, winningMoves: null },
            whoTurn: 0,
          });
          setHostColor({ r: 255, g: 255, b: 255, a: 0.9 });
          setHostWinBy(2);
          setHostSize(3);
          setSessionCookie("playerId", response.playerId, {
            path: "/",
          });
        }
      });
    }
    if (
      sessionCookie?.command === "guest" &&
      parseInt(sessionCookie.lobbyId) === 0
    ) {
      const reqBody = {
        lobbyId: lobbyId,
        playerName: sessionCookie?.name,
      };
      joinLobby(reqBody).then((response) => {
        if (typeof response === "string") {
          setSessionCookie("command", "join", { path: "/" });
          setIsLobbyFound(false);
        } else {
          setIsLobbyFound(true);
          setSessionCookie("lobbyId", lobbyId, { path: "/" });
          setSessionCookie("playerId", response.player.playerId, {
            path: "/",
          });
          setLobby(response.lobby);
          setGameStatus(response.lobby.gameStatus);
          playJoinOrStart();
        }
      });
    }
    if (
      sessionCookie?.command === "leave" &&
      parseInt(sessionCookie.lobbyId) !== 0
    ) {
      const reqBody = {
        lobbyId: sessionCookie.lobbyId,
        playerId: sessionCookie.playerId,
        hostSid: lobby.hostSid,
      };
      
      leaveLobby(reqBody, setSessionCookie);
      
    }

    if (sessionCookie?.command === "welcome") {
      setSessionCookie("lobbyId", 0, { path: "/" });
    }
    
    /* When they are in the middle of the game and they hit the refresh button */
    if (sessionCookie.command === "begin" && lobby.lobbyId === 0) {
      getStartGame(
        {
          lobbyId: sessionCookie.lobbyId,
          playerId: null,
          hostSid: lobby.hostSid,
        },
        setGameStatus,
        setLobby,
        setIsLobbyReceived,
        setSessionCookie
      );
    }
    /* For when the game begins */
    if (
      sessionCookie?.command === "begin" &&
      parseInt(sessionCookie.lobbyId) > 0
    ) {
      getStartGame(
        {
          lobbyId: sessionCookie.lobbyId,
          playerId: sessionCookie.playerId,
          hostSid: lobby.hostSid,
        },
        setGameStatus,
        setLobby,
        setIsLobbyReceived,
        setSessionCookie
      );
    }
    if (
      (sessionCookie.command === "create" ||
        sessionCookie.command === "guest") &&
      parseInt(sessionCookie.lobbyId) !== 0
    ) {
      getGame(
        {
          lobbyId: sessionCookie.lobbyId,
          playerId: null,
          hostSid: lobby.hostSid,
        },
        setLobby,
        setPieceSelection,
        setSessionCookie
      );
    }
  }, [sessionCookie.command]);
}