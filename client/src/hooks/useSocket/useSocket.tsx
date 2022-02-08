import { socket } from "../../socket";
import { useEffect, useRef, useState } from "react";
import { Lobby } from "../../Models/Lobby";
import getLobby from "../../creators/APICreators/getLobby";
import { GameStatus } from "../../Models/GameStatus";
import { Player } from "../../Models/Player";
import { RgbaColor } from "react-colorful";
import updatePlayerLeavingLobby from "./updaters/updatePlayerLeavingLobby";
import updatePlayerDisconnected from "./updaters/updatePlayerDisconnected";
import updatePlayerJoinLobby from "./updaters/updatePlayerJoinLobby";
interface UseSocketProps {
  lobby: Lobby;
  setLobby: (lobby: Lobby) => void;
  setPieceSelection: (piece: string) => void;
  setGameStatus: (gameStatus: GameStatus) => void;
  setPlayerWhoLeftSessionId: (playerWhoLeftSessionId: string) => void;
  setAction: (action: string) => void;
  setIsHost: (isHost: boolean) => void;
  setHostWinBy: (winBy: number) => void;
  setHostColor: (color: RgbaColor) => void;
  setHostSize: (size: number) => void;
  gameStatus: GameStatus;
  action: string;
  playerId: string;
}
export default function useSocket({
  lobby,
  setLobby,
  setPieceSelection,
  setPlayerWhoLeftSessionId,

  setGameStatus,
  action,
  playerId,
  setIsHost,
  setAction,
  setHostColor,
  setHostWinBy,
  gameStatus,
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
        updatePlayerLeavingLobby(
          lobbyRef,
          actionRef,
          data,
          playerIdRef,
          setAction,
          setIsHost,
          setLobby,
          setPlayerWhoLeftSessionId,
          setHostColor,
          setHostWinBy,
          setHostSize
        );
      });

      socket.on("player-disconnected", (playerSessionId) => {
        updatePlayerDisconnected(
          lobbyRef,
          playerId,
          playerSessionId,
          actionRef,
          setPlayerWhoLeftSessionId,
          playerIdRef,
          setIsHost,
          setHostColor,
          setHostWinBy,
          setHostSize,
          setAction,
          setLobby
        );
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

      socket.on("new-move", (gameStatusResponse) => {
        setGameStatus(gameStatusResponse);
        // gameStatusRef.current=gameStatusResponse
      });

      socket.on("player-join-lobby", (newPlayer: Player) => {
        updatePlayerJoinLobby(lobbyRef, newPlayer, setLobby);
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
        socket.removeAllListeners("player-disconnected");
        socket.removeAllListeners("start-game");
        socket.removeAllListeners("play-again");
        socket.removeAllListeners("player-ready");
        socket.removeAllListeners("new-move");
        socket.removeAllListeners("connect");
        socket.removeAllListeners("player-loaded-game");
        socket.removeAllListeners();
      });
    };
  }, []);
}
