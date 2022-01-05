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
import { Lobby } from "../../Models/Lobby";
import useSound from "use-sound";

interface PregameModalProps {
  setPiece: (piece: string) => void;
  playerPiece: string;
  lobby: Lobby;
  setLobby: (lobbyValue: Lobby) => void;
  setPlayerId: (playerIdValue: string) => void;
  playerId: string;
}
export default function PregameModal({
  setPiece,
  playerPiece,
  lobby,
  setLobby,
  setPlayerId,
  playerId,
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
  const [lobbyIdItem, setLobbyIdItem] = useState(0);
  const [sessionCookies, setSessionCookie, removeSessionCookies] = useCookies();

  const handleCreateGameSelect = (name: string) => {
    playJoinOrStart();

    setSessionCookie("command", "create", { path: "/" });
  };
  const handleJoinSelect = (name: string) => {
    playForward();
    setSessionCookie("command", "join", { path: "/" });
  };
  const handleFindSubmit = (lobbyId: number) => {
    playForward();
    setLobbyIdItem(lobbyId);
    setSessionCookie("command", "guest", { path: "/" });
  };
  const handleJoinBackSelect = () => {
    playBackward();
    removeSessionCookies("command");
  };
  const handleLeaveSelect = () => {
    playBackward();
    setSessionCookie("command", "leave", { path: "/" });
  };

  useEffect(() => {
    if (
      sessionCookies?.command === "create" &&
      sessionCookies.lobbyId === undefined
    ) {
      const reqBody = { playerName: sessionCookies?.name };
      createLobby(reqBody).then((response) => {
        setSessionCookie("lobbyId", response.lobby.lobbyId, { path: "/" });
        setLobby(response.lobby);
        // setPlayerId(response.playerId);
        setSessionCookie("playerId", response.playerId, {
          path: "/",
        });

        setSessionCookie(
          "board",
          { size: 3, winBy: 2, color: { r: 194, g: 42, b: 50, a: 1 } },
          { path: "/" }
        );
      });
    }
    if (
      sessionCookies?.command === "guest" &&
      sessionCookies.lobbyId === undefined
    ) {
      const reqBody = {
        lobbyId: lobbyIdItem,
        playerName: sessionCookies?.name,
      };
      joinLobby(reqBody).then((lobbyInfo) => {
        if (typeof lobbyInfo === "string") {
          setSessionCookie("command", "join", { path: "/" });
          setIsLobbyFound(false);
        } else {
          setIsLobbyFound(true);
          setSessionCookie("lobbyId", lobbyIdItem, { path: "/" });
          setSessionCookie("playerId", lobbyInfo.player.playerId, {
            path: "/",
          });
          setLobby(lobbyInfo.lobby);
          // setPlayerId(lobbyInfo.player.playerId);
          playJoinOrStart();
        }
      });
    }
    if (sessionCookies?.command === "leave") {
      const reqBody = {
        lobbyId: sessionCookies?.lobbyId,
        playerId:sessionCookies.playerId,
        hostSid: lobby.hostSid,
      };
      leaveLobby(reqBody).then(() => {
        removeSessionCookies("lobbyId");
        removeSessionCookies("command");
        removeSessionCookies("playerId");

        setLobby({
          hostSid: 0,
          lobbyId: 0,
          board: {
            size: 0,
            color: { r: 0, g: 0, b: 0, a: 0 },
            winBy: 3,
            moves: [],
          },
          players: [],
        });
        removeSessionCookies("piece");
      });
    }
    if (sessionCookies?.command === "start") {
      const reqBody = {
        lobbyId: lobby?.lobbyId,
        board: sessionCookies?.board,
        piece: playerPiece,
      };
      startGame(reqBody).then((lobbyInfo) => {
        setSessionCookie("lobbyId", lobbyInfo?.lobby?.lobbyId, {
          path: "/",
        });

        setSessionCookie("command", "begin", { path: "/" });
      });
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
              playerId={playerId}
              lobby={lobby}
              setPiece={(props) => setPiece(props)}
              playerPiece={playerPiece}
              handleLeave={() => handleLeaveSelect()}
            />
          )}

          {sessionCookies?.command === "create" && (
            <HostLobby
              playerId={playerId}
              setLobby={(props) => setLobby(props)}
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
