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
  setLobbyId: (lobbyId: number) => void;
  handleStart: () => void;
  action: string;
  setAction: (action: string) => void;
  isLobbyFound: boolean;
  playerName: string;
  setPlayerName: (playerName: string) => void;
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
  setLobbyId,
  handleStart,
  action,
  setAction,
  isLobbyFound,
  playerName,
  setPlayerName,
}: PregameModalProps) {
  const [open, setOpen] = useState(true);

  const [playForward] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/snareForwardButton.mp3"
  );
  const [playBackward] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/floorDrumBackButton.mp3"
  );
  const [playJoinOrStart] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/joinOrStartSound.mp3"
  );

  const handleCreateGameSelect = () => {
    playJoinOrStart();

    setAction("create");
  };
  const handleJoinSelect = () => {
    playForward();
    setAction("join");
  };
  const handleFindSubmit = (lobbyId: number) => {
    playForward();
    setLobbyId(lobbyId);
    setAction("guest");
  };
  const handleJoinBackSelect = () => {
    playBackward();
    setAction("welcome");
  };
  const handleLeaveSelect = () => {
    playBackward();
    setAction("leave");
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
          {(action === "welcome" ||
            action === "leave" ||
            action === "quit") && (
            <Welcome
              playerName={playerName}
              setPlayerName={(props) => setPlayerName(props)}
              joinGame={() => handleJoinSelect()}
              createGame={() => handleCreateGameSelect()}
            />
          )}
          {action === "join" && (
            <Join
              handleJoinBack={() => handleJoinBackSelect()}
              handleJoinSubmit={(lobbyId) => handleFindSubmit(lobbyId)}
              isLobbyFound={isLobbyFound}
            />
          )}
          {action === "guest" && isLobbyFound && (
            <GuestLobby
            playerName={playerName}
              playerId={playerId}
              lobby={lobby}
              setPiece={(props) => setPiece(props)}
              playerPiece={playerPiece}
              handleLeave={() => handleLeaveSelect()}
            />
          )}

          {action === "create" && (
            <HostLobby
              lobbyId={lobby.lobbyId}
              playerName={playerName}
              handleStart={() => handleStart()}
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
