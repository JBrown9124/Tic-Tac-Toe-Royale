import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { RgbaColorPicker, RgbaColor } from "react-colorful";
import Settings from "./Lobby/Settings/Settings";
import React, { useState, useEffect } from "react";
import Welcome from "./Welcome";
import CircularProgress from "@mui/material/CircularProgress";

import { useCookies } from "react-cookie";
import Lobby from "./Lobby/HostLobby";
import Join from "./Join";
import GuestLobby from "./Lobby/GuestLobby";
import { Player } from "../../Models/Player";
import createLobby from "../../creators/createLobby";
import joinLobby from "../../creators/joinLobby";
import leaveLobby from "../../creators/leaveLobby";
interface LobbyProps {
  lobbyId: number;
  players: Player[];
}
interface PregameModalProps {
  sendBoardSettings: (size: number | number[], color: RgbaColor) => void;

  lobby: LobbyProps;
}
export default function PregameModal({
  sendBoardSettings,
  lobby,
}: PregameModalProps) {
  const [open, setOpen] = useState(true);
  const [isLobbyFound, setIsLobbyFound] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState("Tic Tac Toe Master");
  const [lobbyIdItem, setLobbyIdItem] = useState(0);
  const [sessionCookies, setSessionCookie, removeSessionCookies] = useCookies();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // removeSessionCookies("command");
  const handleSubmit = (size: number | number[], color: RgbaColor) => {
    //   setSettings(size, color);
    handleClose();
    sendBoardSettings(size, color);
  };
  const handleStartButtonSelect = (name: string) => {
    setSessionCookie("command", "create", { path: "/" });
    setSessionCookie("name", name, { path: "/" });
  };
  const handleJoinButtonSelect = (name: string) => {
    setSessionCookie("command", "join", { path: "/" });
    setSessionCookie("name", name, { path: "/" });
  };
  const handleJoinSubmit = (lobbyId: number) => {
    setSessionCookie("command", "guest", { path: "/" });
    setLobbyIdItem(lobbyId);
  };
  const handleJoinBack = () => {
    removeSessionCookies("command");
  };
  const handleLeave = () => {
    setSessionCookie("command", "leave", { path: "/" });
  };
  useEffect(() => {
    if (
      sessionCookies?.command === "create" &&
      sessionCookies?.lobby === undefined
    ) {
      const startLobby = async () => {
        const reqBody = { playerName: sessionCookies?.name };
        const lobbyInfo = await createLobby(reqBody);
        setSessionCookie("lobby", lobbyInfo, { path: "/" });

        console.log(lobbyInfo, "startLobby");
      };
      startLobby();
    }
    if (
      sessionCookies?.command === "guest" &&
      sessionCookies?.lobby === undefined
    ) {
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
          setSessionCookie("lobby", lobbyInfo, { path: "/" });
        }
      };
      findLobby();
    }
    if (sessionCookies?.command === "leave") {
      const leavingLobby = async () => {
        console.log(sessionCookies?.lobby?.lobbyId, "leavingLobbyId");
        const reqBody = {
          lobbyId: sessionCookies?.lobby?.lobbyId,
          playerName: playerName,
        };
        const lobbyInfo = await leaveLobby(reqBody);
      };
      leavingLobby();
      removeSessionCookies("lobby");
      removeSessionCookies("piece");
    }
  }, [sessionCookies?.command]);
  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
              joinGame={(name) => handleJoinButtonSelect(name)}
              createGame={(name) => handleStartButtonSelect(name)}
            />
          )}
          {sessionCookies?.command === "join" && (
            <Join
              handleJoinBack={() => handleJoinBack()}
              handleJoinSubmit={(lobbyId) => handleJoinSubmit(lobbyId)}
              isLobbyFound={isLobbyFound}
            />
          )}
          {sessionCookies?.command === "guest" && isLobbyFound && (
            <GuestLobby
              handleLeave={() => handleLeave()}
              players={sessionCookies?.lobby?.players}
            />
          )}
          {/* // ) : (
          //   sessionCookies?.command === "guest" &&
          //   isLobbyFound !== true && (
          //     <Grid
          //       container
          //       direction="row"
          //       sx={{
          //         justifyContent: "center",
          //         textAlign: "center",
          //         margin: "auto",
          //       }}
          //     >
          //       <Grid item>
          //         <CircularProgress />
          //       </Grid>
          //     </Grid>
          //   )
          // )} */}
          {sessionCookies?.command === "create" && (
            <Lobby
              handleLeave={() => handleLeave()}
              players={sessionCookies?.lobby?.players}
              setSettings={(color, size) => handleSubmit(color, size)}
            />
          )}
          {sessionCookies?.command === "leave" && (
            <Welcome
              joinGame={(name) => handleJoinButtonSelect(name)}
              createGame={(name) => handleStartButtonSelect(name)}
            />
          )}
        </Grid>
      </Modal>
    </>
  );
}
