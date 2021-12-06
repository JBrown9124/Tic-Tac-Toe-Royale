import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { RgbaColorPicker, RgbaColor } from "react-colorful";
import Settings from "./Lobby/Settings/Settings";
import React, { useState, useEffect } from "react";
import Welcome from "./Welcome";
import creatRoom from "../../creators/createRoom";
import Lobby from "./Lobby/Lobby";
import Join from "./Join";

import createRoom from "../../creators/createRoom";
interface PregameModalProps {
  sendBoardSettings: (
    size: number | number[],
    color: RgbaColor,
    piece: JSX.Element
  ) => void;
  setName: (name: string) => void;
  setLobbyId: (lobbyId: number) => void;
}
export default function PregameModal({
  sendBoardSettings,
  setName,
  setLobbyId,
}: PregameModalProps) {
  const [open, setOpen] = useState(true);
  const [command, setCommand] = useState("open");

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
  const handleStartButtonSelect= (name: string) => {
    setCommand("start");
    setName(name);
  };
  const handleJoinButtonSelect = (name: string) => {
    setCommand("join");
    setName(name);
  };
 
  useEffect(() => {
    if (command === "start") {
      createRoom();
    }
  }, [command]);
  return (
    <>
      <Modal
        disableEscapeKeyDown
        disableAutoFocus
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

            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {command === "open" && (
            <Welcome
              joinGame={(name) => handleJoinButtonSelect(name)}
              startGame={(name) => handleStartButtonSelect(name)}
            />
          )}
          {command === "join" && (
            <Join handleJoinSubmit={(lobbyId) => setLobbyId(lobbyId)} />
          )}
          {command === "start" && (
            <Lobby
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
