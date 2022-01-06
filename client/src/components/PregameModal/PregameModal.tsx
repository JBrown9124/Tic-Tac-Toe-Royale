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
  const [sessionCookie, setsessionCookie, removesessionCookie] = useCookies();

  const handleCreateGameSelect = () => {
    playJoinOrStart();

    setsessionCookie("command", "create", { path: "/" });
  };
  const handleJoinSelect = () => {
    playForward();
    setsessionCookie("command", "join", { path: "/" });
  };
  const handleFindSubmit = (lobbyId: number) => {
    playForward();
    setLobbyIdItem(lobbyId);
    setsessionCookie("command", "guest", { path: "/" });
  };
  const handleJoinBackSelect = () => {
    playBackward();
    removesessionCookie("command");
  };
  const handleLeaveSelect = () => {
    playBackward();
    setsessionCookie("command", "leave", { path: "/" });
  };

  useEffect(() => {
    if (
      sessionCookie?.command === "create" &&
      sessionCookie.lobbyId === undefined
    ) {
      const reqBody = { playerName: sessionCookie?.name };
      createLobby(reqBody).then((response) => {
        if (response) {
          setsessionCookie("lobbyId", response.lobby.lobbyId, { path: "/" });
          setLobby(response.lobby);

          setsessionCookie("playerId", response.playerId, {
            path: "/",
          });

          setsessionCookie(
            "board",
            { size: 3, winBy: 2, color: { r: 194, g: 42, b: 50, a: 1 } },
            { path: "/" }
          );
        }
      });
    }
    if (
      sessionCookie?.command === "guest" &&
      sessionCookie.lobbyId === undefined
    ) {
      const reqBody = {
        lobbyId: lobbyIdItem,
        playerName: sessionCookie?.name,
      };
      joinLobby(reqBody).then((response) => {
        if (typeof response === "string") {
          setsessionCookie("command", "join", { path: "/" });
          setIsLobbyFound(false);
        } else {
          setIsLobbyFound(true);
          setsessionCookie("lobbyId", lobbyIdItem, { path: "/" });
          setsessionCookie("playerId", response.player.playerId, {
            path: "/",
          });
          setLobby(response.lobby);

          playJoinOrStart();
        }
      });
    }
    if (sessionCookie?.command === "leave") {
      const reqBody = {
        lobbyId: sessionCookie?.lobbyId,
        playerId: sessionCookie.playerId,
        hostSid: lobby.hostSid,
      };
      leaveLobby(reqBody).then(() => {
        removesessionCookie("lobbyId");
        removesessionCookie("command");
        removesessionCookie("playerId");

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
          gameStatus:{
            win: { whoWon: null, type: null, winningMoves: null },
            whoTurn: 0,
          }
        });
        removesessionCookie("piece");
      });
    }
    if (sessionCookie?.command === "start") {
      const reqBody = {
        lobbyId: lobby?.lobbyId,
        board: sessionCookie?.board,
        piece: playerPiece,
      };
      startGame(reqBody).then((lobbyInfo) => {
        setsessionCookie("lobbyId", lobbyInfo?.lobby?.lobbyId, {
          path: "/",
        });

        setsessionCookie("command", "begin", { path: "/" });
      });
    }
  }, [sessionCookie?.command]);
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
          {sessionCookie?.command === undefined && (
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
              playerId={playerId}
              setLobby={(props) => setLobby(props)}
              hostSid={lobby?.hostSid}
              players={lobby?.players}
              handleLeave={() => handleLeaveSelect()}
              setPiece={(props) => setPiece(props)}
              playerPiece={playerPiece}
            />
          )}
          {sessionCookie?.command === "leave" && (
            <Welcome
              joinGame={() => handleJoinSelect()}
              createGame={() => handleCreateGameSelect()}
            />
          )}
        </Grid>
      </Modal>
    </>
  );
}
