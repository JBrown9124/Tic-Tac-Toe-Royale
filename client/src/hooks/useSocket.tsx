import {socket} from "../socket"
import {useEffect, useRef} from "react"
import {Lobby} from "../Models/Lobby"
import {NewMove} from "../Models/NewMove"
import getGame from "../creators/APICreators/getGame"
import { GameStatus } from "../Models/GameStatus"
import {Player} from "../Models/Player"
interface UseSocketProps{
    lobby:Lobby,
    setLobby:(lobby:Lobby)=>void,
    setPieceSelection:(piece:string)=>void,
    setNewMove:(newMove:NewMove)=>void
    setGameStatus:(gameStatus:GameStatus)=>void
    setSessionCookie:Function,
    sessionCookie:any,

}
export default function useSocket({lobby, setLobby, setPieceSelection, sessionCookie, setSessionCookie, setNewMove, setGameStatus}:UseSocketProps){
    const lobbyRef = useRef(lobby);
    useEffect(() => {
        lobbyRef.current = lobby;
      }, [lobby]);
    
      socket.on("connect", () => {
        console.log("Client Connected");
        socket.on("player-leave-lobby", (removedPlayer: string) => {
          if (removedPlayer === "HOST") {
            setSessionCookie("command", "leave", { path: "/" });
          } else {
            const lobbyCopy = lobbyRef.current;
            let newPlayerList = lobbyCopy.players.filter((player) => {
              return player.playerId !== removedPlayer;
            });
            lobbyCopy.players = newPlayerList;
            setLobby({ ...lobbyCopy });
          }
        });
        socket.on("player-ready", () => {
          const lobbyCopy = lobbyRef.current;
    
          setTimeout(() => {
            getGame(
              {
                lobbyId: lobbyCopy.lobbyId,
                playerId: sessionCookie.playerId,
                hostSid: lobbyCopy.hostSid,
              },
              setLobby,
              setPieceSelection,
              setSessionCookie
            );
          }, 500);
        });
        socket.on("start-game", (data) => {
          setSessionCookie("command", "begin", { path: "/" });
        });
        socket.on("new-move", (newMove) => {
          setNewMove(newMove.newMove);
          setGameStatus(newMove.gameStatus);
        });
        socket.on(
          "player-join-lobby",
          (newPlayer: { playerName: string; playerId: string }) => {
           
            const lobbyCopy = lobbyRef.current;
            let playerExists = lobbyCopy.players.filter((player: Player) => {
              return player.playerId === newPlayer.playerId;
            });
           
            const isNewPlayerBot = newPlayer.playerId.substring(0, 3) === "BOT";
            if (playerExists.length === 0) {
              lobbyCopy.players.push({
                name: newPlayer.playerName,
                playerId: newPlayer.playerId,
                piece: "",
                isHost: false,
                turnNumber: 0,
                playerLoaded: isNewPlayerBot ? true : false,
                isReady: isNewPlayerBot ? true : false,
              });
              setLobby({ ...lobbyCopy });
            }
          }
        );
      });
      socket.off("connect_error", () => {
        console.log("socket error");
      });
      socket.on("disconnect", () => {
        socket.removeAllListeners("player-join-lobby");
        socket.removeAllListeners("player-leave-lobby");
        socket.removeAllListeners("start-game");
        socket.removeAllListeners("player-ready");
        socket.removeAllListeners("new-move");
        socket.removeAllListeners("connect");
        socket.removeAllListeners("player-loaded-game");
        socket.removeAllListeners();
      });
    
}