import { socket } from "../socket";
import { useEffect, useRef, useState } from "react";
import { Lobby } from "../Models/Lobby";
import { NewMove } from "../Models/NewMove";
import getLobby from "../creators/APICreators/getLobby";
import { GameStatus } from "../Models/GameStatus";
import { Player } from "../Models/Player";
import leaveLobby from "../creators/APICreators/leaveLobby";
import { RgbaColor } from "react-colorful";
interface UseSocketProps {
  lobby: Lobby;
  setLobby: (lobby: Lobby) => void;
  setPieceSelection: (piece: string) => void;
  setNewMove: (newMove: NewMove) => void;
  setGameStatus: (gameStatus: GameStatus) => void;
  setPlayerWhoLeft: (playerWhoLeftSessionId: string) => void;
  setAction: (action: string) => void;
  setIsHost: (isHost: boolean) => void;
  setHostWinBy:(winBy: number) => void;
  setHostColor: (color: RgbaColor) => void
  setHostSize:(size: number) => void
  action: string;
  playerId: string;
}
export default function useSocket({
  lobby,
  setLobby,
  setPieceSelection,
  setPlayerWhoLeft,
  setNewMove,
  setGameStatus,
  action,
  playerId,
  setIsHost,
  setAction,
  setHostColor,
  setHostWinBy,
  setHostSize,
}: UseSocketProps) {
  const lobbyRef = useRef(lobby);
  const playerIdRef = useRef(playerId);
  const actionRef = useRef(action);

  useEffect(() => {
    lobbyRef.current = lobby;
  }, [lobby]);
  useEffect(() => {
    playerIdRef.current = playerId;
  }, [playerId]);
  useEffect(() => {
    actionRef.current = action;
  }, [action]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Client Connected");

      socket.on("player-leave-lobby", (data) => {
        const lobbyCopy = lobbyRef.current;
        let newPlayerList = lobbyCopy.players.filter((player) => {
          return player.playerId !== data.removedPlayer.playerId;
        });

        if (data.newHost) {
          lobbyCopy.players.map((player) => {
            if (player.playerId === data.newHost.playerId) {
              player.isHost = true;
            }
          });
          if (
            actionRef.current !== "begin" &&
            data.newHost.playerId === playerIdRef.current
          ) {
            setAction("create");
            setIsHost(true);
          }
        }

        lobbyCopy.players = newPlayerList;

        setLobby({ ...lobbyCopy });
        if (actionRef.current === "begin" || actionRef.current === "in game") {
          setPlayerWhoLeft(data.removedPlayer.sessionId);
          if (data.newHost.playerId === playerIdRef.current) {
            setIsHost(true);
          }
        }
      });
      
      socket.on("player-disconnected", (playerSessionId) => {
        console.log(playerSessionId);
        const lobbyCopy = lobbyRef.current;
        // const updatedPlayers = lobbyCopy.players.filter((player: Player) => {
        //   return player.sessionId !== playerSessionId;
        // });
        // lobbyCopy.players = updatedPlayers;

        const reqBody = {
          lobbyId: lobbyCopy.lobbyId,
          player: {
            name: null,
            piece: "Not Needed",
            isHost: false,
            turnNumber: 0,
            isReady: false,
            playerId: playerId,
            playerLoaded: false,
            sessionId: playerSessionId,
          },
          hostSid: lobbyCopy.hostSid,
        };
        leaveLobby(reqBody).then((response) => {
          
        
          if (response) {
            const {data} = response
            const {newHost, lobby} = data
          
            if (actionRef.current === "begin"|| actionRef.current === "in game") {
              setPlayerWhoLeft(playerSessionId);
              if (newHost && newHost.playerId === playerIdRef.current) {
                setIsHost(true);
                setHostColor(lobby.board.color)
                setHostWinBy(lobby.board.winBy);
                setHostSize(lobby.board.size)
              }
            }
            if (
              (actionRef.current !== "begin" &&  actionRef.current !== "in game")&&
              newHost && newHost.playerId === playerIdRef.current
            ) {
              setAction("create");
              setIsHost(true);
            }
          }
        });
      });
      
      socket.on("player-ready", () => {
        const lobbyCopy = lobbyRef.current;

        setTimeout(() => {
          getLobby(
            {
              lobbyId: lobbyCopy.lobbyId,
              playerId: playerId,
              hostSid: lobbyCopy.hostSid,
            },
            setLobby,
            setPieceSelection
          );
        }, 500);
      });
      socket.on("start-game", (data) => {
        setAction("begin");
      });
      socket.on("play-again", (data) => {
        setAction("begin");
      });
      
      socket.on("new-move", (newMove) => {
        setNewMove(newMove.newMove);
        setGameStatus(newMove.gameStatus);
      });

      socket.on("player-join-lobby", (newPlayer: Player) => {
        const lobbyCopy = lobbyRef.current;
        let playerExists = lobbyCopy.players.filter((player: Player) => {
          return player.playerId === newPlayer.playerId;
        });

        const isNewPlayerBot = newPlayer.playerId.substring(0, 3) === "BOT";
        if (playerExists.length === 0) {
          lobbyCopy.players.push({
            name: newPlayer.name,
            playerId: newPlayer.playerId,
            piece: "",
            isHost: false,
            turnNumber: 0,
            playerLoaded: isNewPlayerBot ? true : false,
            isReady: isNewPlayerBot ? true : false,
            sessionId: newPlayer.sessionId,
          });
          setLobby({ ...lobbyCopy });
        }
      });
    });

    socket.off("connect_error", () => {
      console.log("socket error");
    });

    return () => {
      socket.on("disconnect", () => {
        socket.emit("disconnect", {
          hostSid: lobby.hostSid,
          playerId: playerId,
        });
        socket.removeAllListeners("player-join-lobby");
        socket.removeAllListeners("player-leave-lobby");
        socket.removeAllListeners("start-game");
        socket.removeAllListeners("player-ready");
        socket.removeAllListeners("new-move");
        socket.removeAllListeners("connect");
        socket.removeAllListeners("player-loaded-game");
        socket.removeAllListeners();
      });
    };
  }, []);
}
