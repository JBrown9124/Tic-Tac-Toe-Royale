import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";
import { Player } from "../../../Models/Player";
interface PlayerListProps {
  players: Player[];
}
export default function PlayerList({ players }: PlayerListProps) {
  return (
    <>
      <Grid
        container
        textAlign="center"
        justifyContent="center"
     
        sx={{ border: "solid 1px black" , }}
      >
        <Grid item>
          <Typography> Players </Typography>
        </Grid>
        <Grid item>
          <List sx={{ bgcolor: "background.paper" }} aria-label="players">
            {players?.map((player) => (
              <ListItem>
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
