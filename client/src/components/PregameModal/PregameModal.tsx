import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import Welcome from "./Welcome";
import { useCookies } from "react-cookie";
import HostLobby from "./Lobby/HostLobby";
import Join from "./Join";
import GuestLobby from "./Lobby/GuestLobby";
import createLobby from "../../creators/APICreators/createLobby";
import joinLobby from "../../creators/APICreators/joinLobby";
import leaveLobby from "../../creators/APICreators/leaveLobby";
import startGame from "../../creators/APICreators/startGame";
import { RgbaColor } from "react-colorful";
import { Lobby } from "../../Models/Lobby";
import useSound from "use-sound";

interface PregameModalProps {
  setPiece: (piece: string) => void;
  playerPiece: string;
  lobby: Lobby;
  setLobby: (lobbyValue: Lobby) => void;
  setPlayerId: (playerIdValue: string) => void;
  playerId: string;
  isOpen: boolean;
  hostColor: RgbaColor;
  setHostColor: (color: RgbaColor) => void;
  hostSize: number;
  setHostSize: (size: number) => void;
  setHostWinBy: (winBy: number) => void;
  hostWinBy: number;
  setLobbyId:(lobbyId:number) => void;
}
export default function PregameModal({
  setPiece,
  playerPiece,
  lobby,
  setLobby,
  setPlayerId,
  playerId,
  isOpen,
  hostColor,
  setHostColor,
  hostSize,
  setHostSize,
  hostWinBy,
  setHostWinBy,
  setLobbyId
}: PregameModalProps) {
  const [open, setOpen] = useState(true);
  const [isLobbyFound, setIsLobbyFound] = useState<boolean>(true);

  const [playForward] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/snareForwardButton.mp3"
  );
  const [playBackward] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/floorDrumBackButton.mp3"
  );
  const [playJoinOrStart] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/joinOrStartSound.mp3"
  );
  
  const [sessionCookie, setSessionCookie, removeSessionCookie] = useCookies();

  const handleCreateGameSelect = () => {
    playJoinOrStart();

    setSessionCookie("command", "create", { path: "/" });
  };
  const handleJoinSelect = () => {
    playForward();
    setSessionCookie("command", "join", { path: "/" });
  };
  const handleFindSubmit = (lobbyId: number) => {
    playForward();
    setLobbyId(lobbyId);
    setSessionCookie("command", "guest", { path: "/" });
  };
  const handleJoinBackSelect = () => {
    playBackward();
    setSessionCookie("command", "welcome", { path: "/" });
  };
  const handleLeaveSelect = () => {
    playBackward();
    setSessionCookie("command", "leave", { path: "/" });
  };


  return (
    <>
      <Modal
        open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: "auto" }}
      >
        <Grid
          maxHeight="sm"
          maxWidth="sm"
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflow: "auto",
            maxHeight: "100%",

            maxWidth: "100%",
            width: 800,

            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {(sessionCookie?.command === "welcome" ||
            sessionCookie?.command === "leave" ||
            sessionCookie?.command === "quit" || sessionCookie?.command === undefined) && (
            <Welcome
              joinGame={() => handleJoinSelect()}
              createGame={() => handleCreateGameSelect()}
            />
          )}
          {sessionCookie?.command === "join" && (
            <Join
              handleJoinBack={() => handleJoinBackSelect()}
              handleJoinSubmit={(lobbyId) => handleFindSubmit(lobbyId)}
              isLobbyFound={isLobbyFound}
            />
          )}
          {sessionCookie?.command === "guest" && isLobbyFound && (
            <GuestLobby
              playerId={playerId}
              lobby={lobby}
              setPiece={(props) => setPiece(props)}
              playerPiece={playerPiece}
              handleLeave={() => handleLeaveSelect()}
            />
          )}

          {sessionCookie?.command === "create" && (
            <HostLobby
              setWinBy={(props) => setHostWinBy(props)}
              winBy={hostWinBy}
              color={hostColor}
              setColor={(props) => setHostColor(props)}
              size={hostSize}
              setSize={(props) => setHostSize(props)}
              playerId={playerId}
              setLobby={(props) => setLobby(props)}
              hostSid={lobby?.hostSid}
              players={lobby?.players}
              handleLeave={() => handleLeaveSelect()}
              setPiece={(props) => setPiece(props)}
              playerPiece={playerPiece}
            />
          )}
        </Grid>
      </Modal>
    </>
  );
}
