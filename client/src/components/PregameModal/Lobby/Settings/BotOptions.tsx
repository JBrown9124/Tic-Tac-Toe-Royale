import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import { Player } from "../../../../Models/Player";
import { Lobby } from "../../../../Models/Lobby";
import { useContext } from "react";
import useSound from "use-sound";
import handleAddBot from "../../../../creators/HostLobbyCreators/handleAddBot";
import CustomButton from "../../../CustomButton";
import { VolumeContext } from "../../../../storage/VolumeContext";
import leaveLobby from "../../../../creators/APICreators/leaveLobby";

interface BotOptionsProps {
  players: Player[];
  lobbyId: number;
  setLobby: (lobby: Lobby) => void;
  lobby: Lobby;
}
export default function BotOptions({
  players,
  lobbyId,
  setLobby,
  lobby,
}: BotOptionsProps) {
  const volume: number = useContext(VolumeContext);
  const [playAddBotSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/addBotSound.mp3",
    { volume: volume }
  );
  const handleRemoveBot = async () => {
    const botsInLobby = players.filter((player) => {
      return player?.playerId?.substring(0, 3) === "BOT";
    });

    if (botsInLobby.length > 0) {
      const botBeingRemoved = botsInLobby[botsInLobby.length - 1];
      const reqBody = {
        lobbyId: lobbyId,
        player: botBeingRemoved,
        hostSid: null,
      };
      await leaveLobby(reqBody);

      const scanAndRemove = new Promise((resolve, reject) => {
        for (var i = lobby.players.length; i--; ) {
          if (lobby.players[i].playerId === botBeingRemoved.playerId) {
            resolve(lobby.players.splice(i, 1));
          }
        }
      });
      await scanAndRemove;
      setLobby({ ...lobby });
      playAddBotSound();
    }

    // leaveLobby( player: play
    //   lobbyId: number;
    //   hostSid: number;)
  };
  return (
    <>
      <Grid
        container
        direction="column"
        sx={{
          background: "#81c784",
          borderRadius: "5px",
          p: 1,
          border: "1px solid #ec407a",
        }}
      >
        <Grid item sx={{p:1}}>
          <Typography sx={{ fontFamily: "Noto Sans, sans-serif" }}>
            Bots
          </Typography>
        </Grid>
        <Grid item sx={{}} container direction="row" justifyContent="center">
          <Grid item xs={6}>
            <CustomButton
              onClick={() =>
                handleAddBot(players, lobbyId, setLobby, playAddBotSound)
              }
              message={"Add"}
              sx={{ borderRadius: "100px", width: "20%", height: "70%", }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomButton
              onClick={() => handleRemoveBot()}
              message={"Remove"}
              sx={{ borderRadius: "100px", width: "20%", height: "70%" }}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
