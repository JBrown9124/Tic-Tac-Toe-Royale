import Grid from "@mui/material/Grid";
import { useState} from "react";
import Welcome from "./Welcome";
import HostLobby from "./Lobby/HostLobby/HostLobby";
import Join from "./Join";
import GuestLobby from "./Lobby/GuestLobby/GuestLobby";
import { RgbaColor } from "react-colorful";
import { Lobby } from "../../Models/Lobby";
import useSound from "use-sound";
import LobbyBrowser from "./LobbyBrowser"
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
  setIsGuideOpen: (isGuideOpen: boolean) => void;
  volume:number
  setVolume: (volume: number) => void;
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
  setIsGuideOpen,
  volume,setVolume
}: PregameModalProps) {
  
 
  const [playForward] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/snareForwardButton.mp3",{volume:volume}
  );
  const [playBackward] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/floorDrumBackButton.mp3",{volume:volume}
  );


  const handleCreateGameSelect = () => {
    

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
     
      <Grid sx={{}}>
        {(action === "welcome" || action === "leave" || action === "quit") && (
          <Welcome
            playerName={playerName}
            setPlayerName={(props) => setPlayerName(props)}
            joinGame={() => handleJoinSelect()}
            createGame={() => handleCreateGameSelect()}
          />
        )}
        {action === "join" && (
          // <Join
          //   handleJoinBack={() => handleJoinBackSelect()}
          //   handleJoinSubmit={(lobbyId) => handleFindSubmit(lobbyId)}
          //   isLobbyFound={isLobbyFound}
          // />
          <LobbyBrowser/>
        )}
        {action === "guest" && isLobbyFound && (
          <GuestLobby
          volume={volume}
          setVolume={(props) => setVolume(props)}
            setIsGuideOpen={(props) => setIsGuideOpen(props)}
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
          lobby={lobby}
          volume={volume}
          setVolume={(props) => setVolume(props)}
            setIsGuideOpen={(props) => setIsGuideOpen(props)}
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
      {/* </Modal> */}
    </>
  );
}
