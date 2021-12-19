import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { RgbaColorPicker, RgbaColor } from "react-colorful";
import Settings from "./Lobby/Settings/Settings";
import React, { useState, useEffect } from "react";
import Welcome from "./Welcome";
import CircularProgress from "@mui/material/CircularProgress";
import {LobbyContext} from "../../storage/lobbyContext"
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

import useSound from "use-sound";


interface LobbyProps {
  lobbyId: number;
  players: Player[];
}
interface PregameModalProps {
  setPiece: (piece: string) => void;
  playerPiece: string;
  lobby: Lobby;
  setLobby: (lobbyValue: Lobby) => void;
}
export default function PregameModal({
  setPiece,
  playerPiece,
  lobby,
  setLobby,
}: PregameModalProps) {
  const [open, setOpen] = useState(true);
  const [isLobbyFound, setIsLobbyFound] = useState<boolean>(true);
  const [playForward] = useSound(process.env.PUBLIC_URL + '/assets/sounds/snareForwardButton.mp3')
  const [playBackward] = useSound(process.env.PUBLIC_URL + '/assets/sounds/floorDrumBackButton.mp3')
  const [lobbyIdItem, setLobbyIdItem] = useState(0);
  const [sessionCookies, setSessionCookie, removeSessionCookies] = useCookies();


  const handleCreateGameSelect = (name: string) => {
    playForward()
    setSessionCookie("command", "create", { path: "/" });
  };
  const handleJoinSelect = (name: string) => {
    playForward()
    setSessionCookie("command", "join", { path: "/" });
  };
  const handleFindSubmit = (lobbyId: number) => {
    playForward()
    setLobbyIdItem(lobbyId);
    setSessionCookie("command", "guest", { path: "/" });
  };
  const handleJoinBackSelect = () => {
    playBackward()
    removeSessionCookies("command");
  };
  const handleLeaveSelect = () => {
    playBackward()
    setSessionCookie("command", "leave", { path: "/" });
  };
  const handleStartGameSelect = () => {
    setSessionCookie("command", "start", { path: "/" });
  };
  useEffect(() => {
    if (sessionCookies?.command === "create" && sessionCookies.lobbyId===undefined ) {
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
    if (sessionCookies?.command === "guest" && sessionCookies.lobbyId===undefined ) {
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
          playerName: sessionCookies?.name,
          hostSid: lobby.hostSid,
        };
        const lobbyInfo = await leaveLobby(reqBody);
      };
      leavingLobby();
      removeSessionCookies("lobbyId");
      removeSessionCookies("command");
      removeSessionCookies("name");
      setLobby({
        hostSid:0,
        lobbyId: 0,
        board: { size: 0, color: { r: 0, g: 0, b: 0, a: 0 }, winBy: 3, moves: [] },
        players: [
         
        ],
      })
      removeSessionCookies("piece");
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

        await setSessionCookie("lobbyId", lobbyInfo?.lobby?.lobbyId, { path: "/" });

        await setSessionCookie("command", "begin", { path: "/" });
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
       
            hostSid={lobby?.hostSid}
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
