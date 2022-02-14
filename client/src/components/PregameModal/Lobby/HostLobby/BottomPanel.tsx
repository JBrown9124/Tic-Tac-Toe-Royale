import Grid from "@mui/material/Grid";
import arePlayersReady from "../../../../creators/HostLobbyCreators/arePlayersReady";
import CustomButton from "../../../CustomButton";
import Typography from "@mui/material/Typography";
import { Player } from "../../../../Models/Player";

interface BottomHalfPanelProps {
  handleLeave: () => void;

  handleStart: () => void;
  winBy: number;

  size: number;
  playerPiece: string;
  players: Player[];

  setPiece: (piece: string) => void;

  isError: boolean;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
  setIsError: (isError: boolean) => void;
}
export default function BottomHalfPanel({
  isError,
  errorMessage,
  handleLeave,
  setErrorMessage,
  setIsError,
  players,
  playerPiece,
  winBy,
  size,
  handleStart,
  setPiece,
}: BottomHalfPanelProps) {
  return (
    <Grid container direction="column" alignItems="center" justifyContent="center">
      {isError && (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          
        >
          <Grid item>
            <Typography
              sx={{
                color: "red",
                fontFamily: "Noto Sans, sans-serif"
                
              }}
            >
              {" "}
              {errorMessage}
            </Typography>
          </Grid>
        </Grid>
      )}
     
      <Grid
        item
        container
        justifyContent="center"
        direction={{xs:"row",md:"column"}}
        sx={{marginTop:{xs:"1px",md:0}}}
        textAlign="center"
        spacing={4}
      >
        <Grid item>
          <CustomButton onClick={handleLeave} message={"leave"} />
        </Grid>

        <Grid item>
          <CustomButton
            onClick={() =>
              arePlayersReady(
                setErrorMessage,
                setIsError,
                players,
                playerPiece,
                winBy,
                size
              )
                ? handleStart()
                : setIsError(true)
            }
            message={"start"}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
