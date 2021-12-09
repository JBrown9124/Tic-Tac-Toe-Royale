import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";
import { Player } from "../../../Models/Player";
import pieces from "../../../storage/pieces";
import {useCookies} from "react-cookie"

export default function PlayerList() {
  const [sessionCookies, setSessionCookies] = useCookies()
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
            {sessionCookies?.lobby?.players?.map((player:Player) => (
              <ListItem>
                {player.isReady && <ListItemText primary={"READY"} />}
                {player.isHost && <ListItemText primary={"HOST"} />}
                {pieces.map((piece) => {
                  if (piece.name === player.piece)
                    return <ListItemText primary={piece.value} />;
                })}

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
