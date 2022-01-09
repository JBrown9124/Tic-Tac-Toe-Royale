import { socket } from "../socket";
import { useEffect, useRef } from "react";
import { Lobby } from "../Models/Lobby";
import { NewMove } from "../Models/NewMove";
import getLobby from "../creators/APICreators/getLobby";
import { GameStatus } from "../Models/GameStatus";
import { Player } from "../Models/Player";
interface UseSocketProps {
  lobby: Lobby;
  setLobby: (lobby: Lobby) => void;
  setPieceSelection: (piece: string) => void;
  setNewMove: (newMove: NewMove) => void;
  setGameStatus: (gameStatus: GameStatus) => void;

  setAction: (action: string) => void;
  action: string;
  playerId: string;
}
export default function useSocket({
  lobby,
  setLobby,
  setPieceSelection,

  setNewMove,
  setGameStatus,
  action,
  setAction,
  playerId,
}: UseSocketProps) {
  const lobbyRef = useRef(lobby);
  useEffect(() => {
    lobbyRef.current = lobby;
  }, [lobby]);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Client Connected");
      socket.on("player-leave-lobby", (removedPlayer: Player) => {
        if (removedPlayer.isHost && action !== "begin") {
          setAction("leave");
        } else {
          const lobbyCopy = lobbyRef.current;
          let newPlayerList = lobbyCopy.players.filter((player) => {
            return player.playerId !== removedPlayer.playerId;
          });
          lobbyCopy.players = newPlayerList;
          setLobby({ ...lobbyCopy });
        }
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
    return () => {
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
    };
  }, []);
}
