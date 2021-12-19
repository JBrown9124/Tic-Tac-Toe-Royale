import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";
import { FaCrown } from "react-icons/fa";
import { Player } from "../../../Models/Player";
import createPiece from "../../../storage/createPiece";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useCookies } from "react-cookie";
interface PlayerListProps {
  players: Player[];
  playerPiece: string;
}
export default function PlayerList({ players, playerPiece }: PlayerListProps) {
  const [sessionCookies, setSessionCookies] = useCookies();
  const pieces = createPiece("black");
  return (
    <>
      <Grid
        container
        textAlign="center"
        direction="column"
        justifyContent="center"
        sx={{ border: "solid 1px black" }}
      >
        <Grid item>
          <Typography> Players </Typography>
        </Grid>
        <Grid item>
          <List
            dense
            sx={{ bgcolor: "background.paper", justifyContent: "center" }}
            aria-label="players"
          >
            {players?.map((player: Player, idx: number) =>
              player.name === sessionCookies.name ? (
                <ListItem key={idx}>
                  {!player.isHost && (
                    <ListItemIcon>
                      {player.isReady ? (
                        <CheckIcon
                          sx={{ width: "40px", height: "40px", color: "green" }}
                        />
                      ) : (
                        <ClearIcon
                          sx={{ width: "40px", height: "40px", color: "red" }}
                        />
                      )}
                    </ListItemIcon>
                  )}
                  {player?.isHost && (
                    <ListItemIcon>
                      {" "}
                      <FaCrown
                        style={{
                          width: "40px",
                          height: "40px",
                          color: "orange",
                        }}
                      />
                    </ListItemIcon>
                  )}
                  {playerPiece.length > 15 ? (
                    <ListItemText
                      inset
                      key={playerPiece}
                      primary={
                        <img
                          src={playerPiece}
                          alt={playerPiece}
                          style={{ width: "40px", height: "40px" }}
                        />
                      }
                    />
                  ) : (
                    pieces.map((piece) => {
                      if (piece?.name === playerPiece)
                        return (
                          <ListItemText
                            inset
                            key={piece?.name}
                            primary={piece?.value}
                          />
                        );
                    })
                  )}

                  <ListItemText
                    sx={{ textAlign: "center" }}
                    primary={player.name}
                  />
                </ListItem>
              ) : (
                <ListItem key={idx}>
                   {!player.isHost && (
                    <ListItemIcon>
                      {player.isReady ? (
                        <CheckIcon
                          sx={{ width: "40px", height: "40px", color: "green" }}
                        />
                      ) : (
                        <ClearIcon
                          sx={{ width: "40px", height: "40px", color: "red" }}
                        />
                      )}
                    </ListItemIcon>
                  )}

                  {player?.isHost && (
                    <ListItemIcon>
                      {" "}
                      <FaCrown
                        style={{
                          width: "40px",
                          height: "40px",
                          color: "orange",
                        }}
                      />
                    </ListItemIcon>
                  )}
                  {player?.piece?.length > 15 ? (
                    <ListItemText
                      inset
                      key={player?.piece}
                      primary={
                        <img
                          src={player?.piece}
                          alt={player?.piece}
                          style={{ width: "40px", height: "40px" }}
                        />
                      }
                    />
                  ) : (
                    pieces.map((piece) => {
                      if (piece?.name === player?.piece)
                        return (
                          <ListItemText
                            inset
                            key={piece?.name}
                            primary={piece?.value}
                          />
                        );
                    })
                  )}

                  <ListItemText
                    sx={{ textAlign: "center" }}
                    primary={player.name}
                  />
                </ListItem>
              )
            )}
          </List>
        </Grid>
      </Grid>
    </>
  );
}
