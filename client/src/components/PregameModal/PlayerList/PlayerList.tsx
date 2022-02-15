import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FaCrown } from "react-icons/fa";
import { Player } from "../../../Models/Player";
import createPiece from "../../../creators/BoardCreators/createPiece";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import SkeletonPlayers from "../Lobby/SkeletonPlayers";
import LobbyPlayer from "./LobbyPlayer";
interface PlayerListProps {
  players: Player[];
  playerPiece: string;
  playerName: string;
  playerId: string;
}
export default function PlayerList({
  players,
  playerPiece,
  playerName,
  playerId,
}: PlayerListProps) {
  return (
    <>
      <Grid
        container
        textAlign="center"
        direction="column"
        justifyContent="center"
        sx={{ p: 1 }}
      >
        <>
          {players.map(
            (player) =>
              player.isHost && (
                <LobbyPlayer
                  playerId={playerId}
                  playerPiece={playerPiece}
                  player={player}
                />
              )
          )}
        </>
        <>
          {players.map(
            (player) =>
              !player.isHost && (
                <LobbyPlayer
                  playerId={playerId}
                  playerPiece={playerPiece}
                  player={player}
                />
              )
          )}
        </>
      </Grid>
    </>
  );
}
