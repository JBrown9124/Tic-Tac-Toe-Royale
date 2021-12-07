import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { RgbaColorPicker, RgbaColor } from "react-colorful";
import Settings from "./Lobby/Settings/Settings";
import React, { useState, useEffect } from "react";
import Welcome from "./Welcome";
import creatRoom from "../../creators/createRoom";
import { useCookies } from 'react-cookie';
import Lobby from "./Lobby/HostLobby";
import Join from "./Join";
import GuestLobby from "./Lobby/GuestLobby";
import { Player } from "../../Models/Player";
import createRoom from "../../creators/createRoom";
import joinLobby from "../../creators/joinLobby";
interface LobbyProps {
  lobbyId: number;
  players: Player[];
}
interface PregameModalProps {
  sendBoardSettings: (
    size: number | number[],
    color: RgbaColor,
    piece: JSX.Element
  ) => void;

  lobby: LobbyProps;
}
export default function PregameModal({
  sendBoardSettings,
  lobby,
}: PregameModalProps) {
  const [open, setOpen] = useState(true);
  const [command, setCommand] = useState("open");
  const [playerName, setPlayerName] = useState("Tic Tac Toe Master");
  const [lobbyIdItem, setLobbyIdItem] = useState(0)
  const [sessionCookies, setSessionCookie, removeSessionCookies] = useCookies()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = (
    size: number | number[],
    color: RgbaColor,
    piece: JSX.Element
  ) => {
    //   setSettings(size, color);
    handleClose();
    sendBoardSettings(size, color, piece);
  };
  const handleStartButtonSelect = (name: string) => {
    setCommand("create");
    setPlayerName(name);
  };
  const handleJoinButtonSelect = (name: string) => {
    setCommand("join");
    setPlayerName(name);
  };
  const handleJoinSubmit = (lobbyId: number) => {
    setCommand("guest");
    setLobbyIdItem(lobbyId);
  };

  useEffect(() => {
    if (command === "create") {
      const startLobby = async () => {
        const reqBody = { playerName: playerName };
        const lobbyInfo = await createRoom(reqBody);
      
        console.log(lobbyInfo, "startLobby");
      };
      startLobby();
    }
    if (command === "guest") {
      const findLobby = async () => {
        const reqBody = { lobbyId: lobbyIdItem, playerName: playerName };
        const lobbyInfo= await joinLobby(reqBody);
        setSessionCookie(
          "session",
          { lobby:{...lobbyInfo} },
          { path: "/" }
        );
      };
      findLobby();
    }
  }, [command]);
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
            overflow:"auto",
            width:800,
         
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
          
         
        >
          {command === "open" && (
            <Welcome
              joinGame={(name) => handleJoinButtonSelect(name)}
              createGame={(name) => handleStartButtonSelect(name)}
            />
          )}
          {command === "join" && (
            <Join handleJoinSubmit={(lobbyId) => handleJoinSubmit(lobbyId)} />
          )}
          {command === "guest" && <GuestLobby players={sessionCookies?.session?.lobby?.players} />}
          {command === "create" && (
            <Lobby
              players={sessionCookies?.session?.lobby?.players}
              setSettings={(color, size, piece) =>
                handleSubmit(color, size, piece)
              }
            />
          )}
        </Grid>
      </Modal>
    </>
  );
}
