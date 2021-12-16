import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { RgbaColorPicker, RgbaColor } from "react-colorful";
import Settings from "./Lobby/Settings/Settings";
import React, { useState, useEffect } from "react";
import Welcome from "./Welcome";
import CircularProgress from "@mui/material/CircularProgress";

import { useCookies } from "react-cookie";
import HostLobby from "./Lobby/HostLobby";
import Join from "./Join";
import GuestLobby from "./Lobby/GuestLobby";
import { Player } from "../../Models/Player";
import createLobby from "../../creators/createLobby";
import joinLobby from "../../creators/joinLobby";
import leaveLobby from "../../creators/leaveLobby";
import startGame from "../../creators/startGame";
import { Lobby } from "../../Models/Lobby";
interface LobbyProps {
  lobbyId: number;
  players: Player[];
}
interface PregameModalProps {
  setPiece: (piece: string) => void;
  playerPiece: string;
  lobby: Lobby;
  setLobby: (lobby: Lobby) => void;
}
export default function PregameModal({
  setPiece,
  playerPiece,
  lobby,
  setLobby,
}: PregameModalProps) {
  const [open, setOpen] = useState(true);
  const [isLobbyFound, setIsLobbyFound] = useState<boolean>(true);
  const [playerName, setPlayerName] = useState("Tic Tac Toe Master");
  const [lobbyIdItem, setLobbyIdItem] = useState(0);
  const [sessionCookies, setSessionCookie, removeSessionCookies] = useCookies();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateGameSelect = (name: string) => {
    setSessionCookie("command", "create", { path: "/" });
    setSessionCookie("name", name, { path: "/" });
  };
  const handleJoinSelect = (name: string) => {
    setSessionCookie("command", "join", { path: "/" });
    setSessionCookie("name", name, { path: "/" });
  };
  const handleFindSubmit = (lobbyId: number) => {
    setSessionCookie("command", "guest", { path: "/" });
    setLobbyIdItem(lobbyId);
  };
  const handleJoinBackSelect = () => {
    removeSessionCookies("command");
  };
  const handleLeaveSelect = () => {
    setSessionCookie("command", "leave", { path: "/" });
  };
  const handleStartGameSelect = () => {
    setSessionCookie("command", "start", { path: "/" });
  };
  useEffect(() => {
    if (sessionCookies?.command === "create") {
      const startLobby = async () => {
        const reqBody = { playerName: sessionCookies?.name };
        const lobbyInfo = await createLobby(reqBody);
        setSessionCookie("lobbyId", lobbyInfo.lobbyId, { path: "/" });
        setLobby(lobbyInfo);

        console.log(lobbyInfo, "startLobby");
      };
      startLobby();
      setSessionCookie(
        "board",
        { size: 3, winBy: 2, color: { r: 194, g: 42, b: 50, a: 1 } },
        { path: "/" }
      );
    }
    if (sessionCookies?.command === "guest") {
      const findLobby = async () => {
        const reqBody = {
          lobbyId: lobbyIdItem,
          playerName: sessionCookies?.name,
        };
        const lobbyInfo = await joinLobby(reqBody);
        console.log(lobbyInfo, "LobbyInfo");

        if (typeof lobbyInfo === "string") {
          setSessionCookie("command", "join", { path: "/" });
          setIsLobbyFound(false);
        } else {
          setIsLobbyFound(true);
          setSessionCookie("lobbyId", lobbyIdItem, { path: "/" });
          setLobby(lobbyInfo);
        }
      };
      findLobby();
    }
    if (sessionCookies?.command === "leave") {
      const leavingLobby = async () => {
        console.log(sessionCookies?.lobby?.lobbyId, "leavingLobbyId");
        const reqBody = {
          lobbyId: sessionCookies?.lobbyId,
          playerName: playerName,
          hostSid:lobby.hostSid
        };
        const lobbyInfo = await leaveLobby(reqBody);
        removeSessionCookies("lobbyId");
        removeSessionCookies("command");
        removeSessionCookies("name");

        removeSessionCookies("piece");
      };
      leavingLobby();
    }
    if (sessionCookies?.command === "start") {
      const initiateGame = async () => {
        console.log(sessionCookies?.lobby?.lobbyId, "leavingLobbyId");
        const reqBody = {
          lobbyId: lobby?.lobbyId,
          board: sessionCookies?.board,
          piece: playerPiece,
        };
        const lobbyInfo = await startGame(reqBody);

        setSessionCookie("lobbyId", lobbyInfo?.lobby?.lobbyId, { path: "/" });

        setSessionCookie("command", "begin", { path: "/" });
      };
      initiateGame();
    }
  }, [sessionCookies?.command]);
  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: "auto" }}
      >
        <Grid
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflow: "auto",
            width: 800,

            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {sessionCookies?.command === undefined && (
            <Welcome
              joinGame={(name) => handleJoinSelect(name)}
              createGame={(name) => handleCreateGameSelect(name)}
            />
          )}
          {sessionCookies?.command === "join" && (
            <Join
              handleJoinBack={() => handleJoinBackSelect()}
              handleJoinSubmit={(lobbyId) => handleFindSubmit(lobbyId)}
              isLobbyFound={isLobbyFound}
            />
          )}
          {sessionCookies?.command === "guest" && isLobbyFound && (
            <GuestLobby
              lobby={lobby}
              setPiece={(props) => setPiece(props)}
              playerPiece={playerPiece}
              handleLeave={() => handleLeaveSelect()}
            />
          )}

          {sessionCookies?.command === "create" && (
            <HostLobby
              players={lobby?.players}
              handleLeave={() => handleLeaveSelect()}
              setPiece={(props) => setPiece(props)}
              playerPiece={playerPiece}
            />
          )}
          {sessionCookies?.command === "leave" && (
            <Welcome
              joinGame={(name) => handleJoinSelect(name)}
              createGame={(name) => handleCreateGameSelect(name)}
            />
          )}
        </Grid>
      </Modal>
    </>
  );
}
