import { useEffect, useState } from "react";
import { Lobby } from "../Models/Lobby";
import { GameStatus } from "../Models/GameStatus";
import createLobby from "../creators/APICreators/createLobby";
import joinLobby from "../creators/APICreators/joinLobby";
import leaveLobby from "../creators/APICreators/leaveLobby";
import getStartGame from "../creators/APICreators/getStartGame";
import getGame from "../creators/APICreators/getLobby";
import useSound from "use-sound";
import { RgbaColor } from "react-colorful";
import { NewMove } from "../Models/NewMove";
interface UseCommandsProps {
  action: string;
  lobby: Lobby;
  lobbyId: number;

  setLobby: (lobby: Lobby) => void;
  setGameStatus: (gameStatus: GameStatus) => void;
  setHostColor: (color: RgbaColor) => void;
  setHostWinBy: (winBy: number) => void;
  setHostSize: (size: number) => void;
  setIsLobbyReceived: (isLobbyReceived: boolean) => void;
  setPieceSelection: (piece: string) => void;
  setIsLobbyFound: (isLobbyFound: boolean) => void;
  setLobbyId: (lobbyId: number) => void;
  setPlayerId: (playerId: string) => void;
  setPlayerName: (playerName: string) => void;
  playerName: string;
  playerId: string;
  setAction: (action: string) => void;
  isHost: boolean;
  setNewMove:(newMove:NewMove) => void;
}

export default function useCommands({
  action,
  lobbyId,
  lobby,

  setLobby,
  setGameStatus,
  setHostColor,
  setHostWinBy,
  setHostSize,
  setIsLobbyReceived,
  setPieceSelection,
  setIsLobbyFound,
  setPlayerId,
  setLobbyId,
  isHost,
  setPlayerName,
  playerName,
  playerId,
  setAction,
  setNewMove
}: UseCommandsProps) {
  const [playJoinOrStart] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/joinOrStartSound.mp3"
  );
  useEffect(() => {
    if (action === "create") {
      const reqBody = { playerName: playerName };
      createLobby(reqBody).then((response) => {
        if (response) {
          setLobbyId(response.lobby.lobbyId);
          setLobby(response.lobby);
         
          setHostColor({ r: 255, g: 255, b: 255, a: 0.9 });
          setHostWinBy(2);
          setPlayerId(response.playerId);
        }
      });
    } else if (action === "guest") {
      const reqBody = {
        lobbyId: lobbyId,
        playerName: playerName,
      };
      joinLobby(reqBody).then((response) => {
        if (typeof response === "string") {
          setAction("join");
          setIsLobbyFound(false);
        } else {
          setIsLobbyFound(true);
          setLobbyId(response.lobby.lobbyId);
          setPlayerId(response.player.playerId);
          setLobby(response.lobby);
     
          playJoinOrStart();
        }
      });
    } else if (action === "leave") {
      const reqBody = {
        lobbyId: lobbyId,
        player: {
          name: playerName,
          piece: "Not Needed",
          isHost: isHost,
          turnNumber: 0,
          isReady: false,
          playerId: playerId,
          playerLoaded: false,
        },
        hostSid: lobby.hostSid,
      };
      setLobby({
        hostSid: 0,
        lobbyId: 0,
        board: {
          size: 3,
          color: { r: 255, g: 255, b: 255, a: 0.9 },
          winBy: 3,
          moves: [],
        },
        players: [],
        gameStatus: {
          win: { whoWon: null, type: null, winningMoves: null },
          whoTurn: 0,
        },
      })
      setGameStatus({
        win: { whoWon: null, type: null, winningMoves: null },
        whoTurn: 0,
      });
      setNewMove({
        turnNumber: 0,
        rowIdx: 0,
        tileIdx: 0,
        win: { whoWon: null, type: null, winningMoves: null },
      });
      setIsLobbyReceived(false);
      setIsLobbyFound(true);
      leaveLobby(reqBody);
    } else if (action === "begin") {
      getStartGame(
        {
          lobbyId: lobbyId,
          playerId: null,
          hostSid: lobby.hostSid,
        },
        setGameStatus,
        setLobby,
        setIsLobbyReceived
      );
    }
  }, [action]);
}
