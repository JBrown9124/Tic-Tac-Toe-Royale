import Grid from "@mui/material/Grid";
import getLobbies from "../../creators/APICreators/getLobbies";
import { Lobby } from "../../Models/Lobby";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
export default function LobbyBrowser() {
  const [lobbies, setLobbies] = useState<Lobby[]>([]);
  useEffect(() => {
    getLobbies(setLobbies);
    const t = setInterval(() => {
      getLobbies(setLobbies);
    }, 15000);
    return () => {
      clearInterval(t);
    };
  }, []);
  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Grid
          container
          direction="row"
          sx={{
            background: "black",
            marginTop: "30px",
            borderRadius: "5px",
            borderColor: "white",
            width: "50%",
          }}
        >
          <Grid item lg={4}>
            <Typography variant="h6" sx={{ color: "white" }}>
              Lobby Id
            </Typography>
          </Grid>
          <Grid item lg={4}>
            <Typography variant="h6" sx={{ color: "white" }}>
              Amount of Players
            </Typography>
          </Grid>
        </Grid>
        {lobbies.map((lobby) => (
          <Grid
            container
            direction="row"
            sx={{
              background: "black",
              marginTop: "30px",
              borderRadius: "5px",
              borderColor: "white",
              width: "50%",
            }}
          >
            <Grid item lg={4}>
              <Typography variant="h6" sx={{ color: "white" }}>
                {lobby.lobbyId}
              </Typography>
            </Grid>
            <Grid item lg={4}>
              <Typography variant="h6" sx={{ color: "white" }}>
                {lobby.players.length}
              </Typography>
            </Grid>
            <Grid item lg={4}>
              <Button> join </Button>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
