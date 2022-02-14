import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import { Player } from "../../../../Models/Player";
import { Lobby } from "../../../../Models/Lobby";

import useSound from "use-sound";
import handleAddBot from "../../../../creators/HostLobbyCreators/handleAddBot";
import CustomButton from "../../../CustomButton";


interface BotOptionsProps {
  players: Player[];
  lobbyId: number;
  setLobby: (lobby: Lobby) => void;
}
export default function BotOptions({
  players,
  lobbyId,
  setLobby,
}: BotOptionsProps) {
  const [playAddBotSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/addBotSound.mp3", {volume:.1}
  );
  return (
    <>
      <Grid
        container
        direction="column"
        sx={{ background: "#81c784", borderRadius: "5px", p:1, border:"1px solid #ec407a" }}
      >
        <Grid item>
          <Typography sx={{ fontFamily: "Noto Sans, sans-serif" }}>
            Bots
          </Typography>
        </Grid>
        <Grid item sx={{p:1}}>
          {/* <Tooltip
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
          > */}
            {/* <div> */}
              <CustomButton
                onClick={() =>
                  handleAddBot(players, lobbyId, setLobby, playAddBotSound)
                }
                message={"Add"}
                sx={{ borderRadius: "100px", width:"20%", height:"20%"}}
                // icon={
                //   <img
                //     style={{ width: "40px", height: "40px" }}
                //     src={
                //       "https://cdn1.iconfinder.com/data/icons/robots-avatars-set/354/Robot_bot___robot_robo_bot_artificial_intelligence-512.png"
                //     }
                //     alt={"bot"}
                //   />
                // }
              />
            {/* </div>
          </Tooltip>{" "} */}
        </Grid>
      </Grid>
    </>
  );
}
