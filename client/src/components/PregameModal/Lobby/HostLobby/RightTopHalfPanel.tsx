import Settings from "../Settings/Settings";
import Grid from "@mui/material/Grid";
import PlayerList from "../PlayerList";
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
    const [playAddBotSound] = useSound(
        process.env.PUBLIC_URL + "static/assets/sounds/addBotSound.mp3"
      );
    return (
    <Grid container item justifyContent="center" alignItems="center">
      <Grid item sx={{ p: 1 }}>
        <Tooltip
          placement="right"
          TransitionComponent={Zoom}
          title={
            <Typography
              sx={{
                fontSize: "10px",
                fontFamily: "Bungee Hairline, cursive !important",
                fontWeight: "800 !important",
              }}
            >
              Add up to 10 bots!
            </Typography>
          }
        >
          <div>
            <CustomButton
              onClick={() =>
                handleAddBot(players, lobbyId, setLobby, playAddBotSound)
              }
              message={"+"}
              sx={{ fontSize: "2rem", borderRadius: "100px" }}
              icon={
                <img
                  style={{ width: "40px", height: "40px" }}
                  src={
                    "https://cdn1.iconfinder.com/data/icons/robots-avatars-set/354/Robot_bot___robot_robo_bot_artificial_intelligence-512.png"
                  }
                  alt={"bot"}
                />
              }
            />
          </div>
        </Tooltip>
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
