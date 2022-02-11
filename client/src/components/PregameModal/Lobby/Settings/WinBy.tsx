import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Zoom from "@mui/material/Zoom";
import { useSound } from "use-sound";
import { primaryFontColor } from "../../../../themes/theme1";

const StyledTextField = styled(TextField)({
  background: "transparent",
  borderBottomColor: "black",
  "& .MuiInput-underline:before": {
    borderBottomColor: "black",
  },

  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
    backgroundColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#e8f5e9",
    },

    "&:hover fieldset": {},
    "&.Mui-focused fieldset": {
      borderColor: "#ffecb3",

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
  const [playSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/snareForwardButton.mp3"
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
        sx={{ background: "#81c784", borderRadius: "5px", p:2, border:"1px solid #ec407a"}}
      >
        <Typography
          sx={{
            fontFamily: "Noto Sans, sans-serif",
            color: primaryFontColor,
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
              style: { fontFamily: "Noto Sans, sans-serif" },
              step: 1,
              min: 2,
              max: size,
              type: "number",
              "aria-labelledby": "winBy",
            }}
            sx={{  marginLeft: 1 }}
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
