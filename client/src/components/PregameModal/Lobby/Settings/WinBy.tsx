import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Zoom from "@mui/material/Zoom";
import { useSound } from "use-sound";
import { useContext } from "react";
import { VolumeContext } from "../../../../storage/VolumeContext";
import { primaryFontColor } from "../../../../themes/theme1";

const StyledTextField = styled(TextField)({
  background: "transparent",
  borderBottomColor: "#04f005",
  "& .MuiInput-underline:before": {
    borderBottomColor: "#04f005",
  },

  "& label.Mui-focused": {
    color: "#04f005",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#04f005",
    backgroundColor: "#04f005",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#04f005",
    },

    "&:hover fieldset": {},
    "&.Mui-focused fieldset": {
      borderColor: "#04f005",

      fontFamily: "Noto Sans, sans-serif",
    },
  },
});
interface WinByProps {
  winBy: number;
  setWinBy: (value: number) => void;
  size: number;
}
export default function WinBy({ winBy, setWinBy, size }: WinByProps) {
  const volume: number = useContext(VolumeContext);
  const [playSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/snareForwardButton.mp3",
    { volume: volume }
  );
  const handleInputChange = (value: number) => {
    setWinBy(value);
    playSound();
  };

  return (
    <>
      <Grid
        container
        direction="row"
        spacing={0}
        alignItems="center"
        justifyContent="center"
        sx={{
          // background: '#dcc3e2',
          // borderRadius: "5px",
          p: 2,
         
        }}
      >
        <Typography
          sx={{
            fontFamily: "Noto Sans, sans-serif",
            color: "white",
          }}
        >
          Win by
        </Typography>
        <Tooltip
          placement="right"
          TransitionComponent={Zoom}
          title={
            <Typography
              sx={{
                fontFamily: "Noto Sans, sans-serif",
              }}
            >
              Amount of pieces in a row to win.
            </Typography>
          }
        >
          <StyledTextField
            error={winBy > size}
            value={winBy}
            inputProps={{
              style: { fontFamily: "Noto Sans, sans-serif", color:"white"},
              step: 1,
              min: 2,
              max: size,
              type: "number",
              "aria-labelledby": "winBy",
            }}
            sx={{ marginLeft: 1, borderBottomColor: "white"}}
            variant="standard"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(parseInt(e.target.value))
            }
            type="number"
          />
        </Tooltip>
      </Grid>
    </>
  );
}
