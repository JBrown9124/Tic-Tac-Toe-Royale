import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";
export default function PlayerList() {
  return (
    <>
      <Grid container direction="column">
      <Grid item>
        <Typography> Players </Typography>
      </Grid>
        <Grid item>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            aria-label="contacts"
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary="Chelsea Otakan" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText inset primary="Eric Hoffman" />
              </ListItemButton>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  );
}
