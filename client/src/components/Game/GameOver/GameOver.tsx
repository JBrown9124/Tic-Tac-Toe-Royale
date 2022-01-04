import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useCookies } from "react-cookie";
import { GameStatus } from "../../../Models/GameStatus";
import { Player } from "../../../Models/Player";
interface GameOverProps {
  showGameOver: boolean;
  gameStatus: GameStatus;
  players: Player[];
}
export default function GameOver({
  showGameOver,
  gameStatus,
  players,
}: GameOverProps) {
  return (
    <>
      <Modal
        open={showGameOver}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: "auto" }}
      >
        <Grid
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflow: "auto",
            width: 800,

            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Grid container>
            <Grid item>
              <Typography variant="h2">Game Over</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h2">
                {players?.map((player) => {
                  if (player.turnNumber === gameStatus?.win?.whoWon) {
                    return player.name;
                  }
                })}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
}
