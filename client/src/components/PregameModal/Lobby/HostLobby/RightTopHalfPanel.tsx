import Settings from "../Settings/Settings";
import Grid from "@mui/material/Grid";
import PlayerList from "../../PlayerList/PlayerList";
import { useState } from "react";
import arePlayersReady from "../../../../creators/HostLobbyCreators/arePlayersReady";
import handleAddBot from "../../../../creators/HostLobbyCreators/handleAddBot";
import sendHostPiece from "../../../../creators/HostLobbyCreators/sendHostPiece";
import CustomButton from "../../../CustomButton";
import Typography from "@mui/material/Typography";
import { Player } from "../../../../Models/Player";
import { Lobby } from "../../../../Models/Lobby";
import { RgbaColor } from "react-colorful";
import CopyLobbyId from "../CopyLobbyId";
import PieceSelector from "../Settings/PieceSelector/PieceSelector";

import useSound from "use-sound";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
interface RightTopHalfPanelProps{
setLobby: (lobby: Lobby) => void;
playerPiece: string;
  players: Player[];
playerId: string;
  playerName: string;
  lobbyId: number;
}
export default function RightTopHalfPanel({players,lobbyId,setLobby,playerId,playerName,playerPiece}:RightTopHalfPanelProps) {
  
    return (
    <Grid container item justifyContent="center" alignItems="center">
      <Grid item sx={{ p: 1 }}>
      
      </Grid>

      <PlayerList
        playerId={playerId}
        playerName={playerName}
        players={players}
        playerPiece={playerPiece}
      />
    </Grid>
  );
}
