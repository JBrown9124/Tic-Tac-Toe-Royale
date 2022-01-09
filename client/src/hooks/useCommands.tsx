import { useEffect, useState } from "react";
import { Lobby } from "../Models/Lobby";
import { GameStatus } from "../Models/GameStatus";
import createLobby from "../creators/APICreators/createLobby";
import joinLobby from "../creators/APICreators/joinLobby";
import leaveLobby from "../creators/APICreators/leaveLobby";
import getStartGame from "../creators/APICreators/getStartGame";
import getGame from "../creators/APICreators/getGame";
import useSound from "use-sound";
import { RgbaColor } from "react-colorful";
interface UseCommandsProps {
  sessionCookie: any;
  lobby: Lobby;
  lobbyId: number;
  setSessionCookie: Function;
  setLobby: (lobby: Lobby) => void;
  setGameStatus: (gameStatus: GameStatus) => void;
  setHostColor: (color: RgbaColor) => void;
  setHostWinBy: (winBy: number) => void;
  setHostSize: (size: number) => void;
  setIsLobbyReceived: (isLobbyReceived: boolean) => void;
  setPieceSelection: (piece: string) => void;
  setIsLobbyFound: (isLobbyFound: boolean) => void;
}

export default function useCommands({
  sessionCookie,
  lobbyId,
  lobby,
  setSessionCookie,
  setLobby,
  setGameStatus,
  setHostColor,
  setHostWinBy,
  setHostSize,
  setIsLobbyReceived,
  setPieceSelection,
  setIsLobbyFound,
}: UseCommandsProps) {
  const [playJoinOrStart] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/joinOrStartSound.mp3"
  );
  useEffect(() => {
    if (
      sessionCookie?.command === "create" &&
      (parseInt(sessionCookie.lobbyId) === 0 ||
        sessionCookie.lobbyId === undefined)
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
    } else if (
      sessionCookie?.command === "guest" &&
      (parseInt(sessionCookie.lobbyId) === 0 ||
        sessionCookie.lobbyId === undefined)
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
    } else if (sessionCookie?.command === "leave") {
      const reqBody = {
        lobbyId: sessionCookie.lobbyId,
        playerId: sessionCookie.playerId,
        hostSid: lobby.hostSid,
      };

      leaveLobby(reqBody, setSessionCookie);
      setSessionCookie("lobbyId", 0, { path: "/" });
    } else if (sessionCookie?.command === "welcome") {
      setSessionCookie("lobbyId", 0, { path: "/" });
    } else if (

    /* When they are in the middle of the game and they hit the refresh button */
      sessionCookie.command === "begin" &&
      (parseInt(sessionCookie.lobbyId) !== 0 ||
        sessionCookie.lobbyId !== undefined)
    ) {
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
    } else if (
    /* For when the game begins */
      sessionCookie?.command === "begin" &&
      (parseInt(sessionCookie.lobbyId) === 0 ||
        sessionCookie.lobbyId === undefined)
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
    } else if (
      (sessionCookie.command === "create" ||
        sessionCookie.command === "guest") &&
      lobby.lobbyId === 0
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
