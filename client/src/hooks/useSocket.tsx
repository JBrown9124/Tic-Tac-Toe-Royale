import { socket } from "../socket";
import { useEffect, useRef, useState } from "react";
import { Lobby } from "../Models/Lobby";
import { Move } from "../Models/Move";
import getLobby from "../creators/APICreators/getLobby";
import { GameStatus } from "../Models/GameStatus";
import { Player } from "../Models/Player";
import leaveLobby from "../creators/APICreators/leaveLobby";
import {powerUps} from "../storage/powerUps"
import { RgbaColor } from "react-colorful";
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
  const gameStatusRef = useRef(gameStatus);

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

        if (actionRef.current !== "begin" && actionRef.current !== "in game") {
          let newPlayerList = lobbyCopy.players.filter((player) => {
            return player.playerId !== data.removedPlayer.playerId;
          });

          if (data.newHost) {
            lobbyCopy.players.forEach((player) => {
              if (player.playerId === data.newHost.playerId) {
                player.isHost = true;
              }
            });

            if (data.newHost.playerId === playerIdRef.current) {
              setAction("create");
              setIsHost(true);
            }
          }

          lobbyCopy.players = newPlayerList;

          setLobby({ ...lobbyCopy });
        } else if (
          actionRef.current === "begin" ||
          actionRef.current === "in game"
        ) {
          setPlayerWhoLeftSessionId(data.removedPlayer.sessionId);

          if (data.newHost.playerId === playerIdRef.current) {
            setIsHost(true);
            setHostColor(lobbyCopy.board.color);
            setHostWinBy(lobbyCopy.board.winBy);
            setHostSize(lobbyCopy.board.size);
          }
        }
      });

      socket.on("player-disconnected", (playerSessionId) => {
        const lobbyCopy = lobbyRef.current;

        const reqBody = {
          lobbyId: lobbyCopy.lobbyId,
          player: {
            name: null,
            piece: "Not Needed",
            isHost: false,
            inventory: {},
            isReady: false,
            playerId: playerId,
            playerLoaded: false,
            sessionId: playerSessionId,
            
          },
          hostSid: lobbyCopy.hostSid,
        };
        leaveLobby(reqBody).then((response) => {
          if (response) {
            const { data } = response;
            const { newHost, lobby } = data;

            if (
              actionRef.current === "begin" ||
              actionRef.current === "in game"
            ) {
              setPlayerWhoLeftSessionId(playerSessionId);
              if (newHost && newHost.playerId === playerIdRef.current) {
                setIsHost(true);

                setHostColor(lobbyCopy.board.color);
                setHostWinBy(lobbyCopy.board.winBy);
                setHostSize(lobbyCopy.board.size);
              }
            }

            if (
              actionRef.current !== "begin" &&
              actionRef.current !== "in game" &&
              newHost &&
              newHost.playerId === playerIdRef.current
            ) {
              setAction("create");
              setLobby(lobby);
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

      socket.on("new-move", (gameStatusResponse) => {
        setGameStatus(gameStatusResponse);
        // gameStatusRef.current=gameStatusResponse
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
            piece: isNewPlayerBot ? newPlayer.piece : "",
            isHost: false,
            inventory: powerUps,
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
