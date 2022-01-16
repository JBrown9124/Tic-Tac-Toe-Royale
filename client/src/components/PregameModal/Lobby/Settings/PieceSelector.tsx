import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import createPiece from "../../../../creators/BoardCreators/createPiece";
import Input from "@mui/material/Input";
import useSound from "use-sound";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CustomButton from "../../../CustomButton";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import Zoom from "@mui/material/Zoom";
interface PieceSelectorProps {
  setPiece: (piece: string) => void;
  playerPiece: string;
}
export default function PieceSelector({
  setPiece,
  playerPiece,
}: PieceSelectorProps) {
  const pieces = createPiece("black");
  const [playSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/snareForwardButton.mp3"
  );
  const handleImageUpload = (event: any) => {
    getBase64(event[0], (result: string) => {
      setPiece(result);
      playSound();
    });
  };
  const getBase64 = (file: any, cb: any) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };
  const handleSelectPiece = (pieceName: string) => {
    setPiece(pieceName);
    playSound();
  };
  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography
            sx={{ fontFamily: "Bungee Hairline, cursive", fontWeight: 800 }}
          >
            Select your Piece
          </Typography>
        </Grid>
        <Grid container item direction="row">
          <Grid xs={12} sm={6} item>
            <List
              sx={{
                height: "100px",

                overflow: "auto",
              }}
            >
              {pieces.map((piece) => (
                <ListItemButton
                  key={piece.name}
                  onClick={() => handleSelectPiece(piece.name)}
                  sx={{ justifyContent: "center" }}
                >
                  {piece.value}
                </ListItemButton>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              sx={{
                fontFamily: "Bungee Hairline, cursive",
                fontWeight: 800,
                p: 1,
              }}
            >
              {playerPiece.length === 0 ? "No Piece Selected" : "Your Piece"}
            </Typography>
            {playerPiece?.length > 15 ? (
              <img
                src={playerPiece}
                alt={playerPiece}
                style={{ width: "40px", height: "40px" }}
              />
            ) : (
              pieces.map((piece) => {
                if (piece.name === playerPiece) {
                  return piece.value;
                }
              })
            )}
          </Grid>
        </Grid>
        <Grid item>
          <Tooltip
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
                Upload any image type!
              </Typography>
            }
          >
            <label htmlFor="contained-button-file">
              <Input
                sx={{ display: "none" }}
                id="contained-button-file"
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleImageUpload(e.target.files)
                }
              />

              <Button
                component="span"
                sx={{
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: "#ede7f6",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  },
                  fontFamily: "Major Mono Display, monospace",
                  fontWeight: 800,
                  boxShadow:'rgba(0, 0, 0, 0.24) 0px 1px 4px',
                  color: "black",
                  fill: "transparent",
                  textTransform: "none",
                  border: "solid black 1px",
                  height: "40px",
                  width: "%60",
                  fontSize: "13px",
                }}
              >
                Upload Piece
              </Button>
            </label>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  );
}
