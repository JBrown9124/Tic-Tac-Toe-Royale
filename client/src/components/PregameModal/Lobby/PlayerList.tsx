import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";
import { Player } from "../../../Models/Player";
import createPiece from "../../../storage/createPiece";
import { useCookies } from "react-cookie";
interface PlayerListProps {
  players: Player[];
}
export default function PlayerList({ players }: PlayerListProps) {
  const [sessionCookies, setSessionCookies] = useCookies();
  const pieces =  createPiece("black")
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
          <List sx={{ bgcolor: "background.paper" }} aria-label="players">
            {players?.map((player: Player, idx: number) => (
              <ListItem key={idx}>
                {player?.isReady && <ListItemText primary={"READY"} />}
                {player?.isHost && <ListItemText primary={"HOST"} />}
                {player?.piece?.length > 15 ? (
                  <img
                    src={player?.piece}
                    alt={player?.piece}
                    style={{ width: "40px", height: "40px" }}
                  />
                ) : (
                  pieces.map((piece) => {
                    if (piece?.name === player?.piece)
                      return (
                        <ListItemText
                          key={piece?.name}
                          primary={piece?.value}
                        />
                      );
                  }
                  )
                )}

                <ListItemText
                  sx={{ textAlign: "center" }}
                  primary={player.name}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </>
  );
}
