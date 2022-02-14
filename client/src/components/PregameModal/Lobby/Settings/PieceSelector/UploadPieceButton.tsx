
import Input from "@mui/material/Input";
import useSound from "use-sound";
import Button from "@mui/material/Button";
import {VolumeContext} from "../../../../../storage/VolumeContext"
import {useContext} from 'react'
interface UploadPieceButtonProps {
  setPiece: (piece: string) => void;
}
export default function UploadPieceButton({
  setPiece,
}: UploadPieceButtonProps) {
  const volume:number = useContext(VolumeContext)
  const [playSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/snareForwardButton.mp3", {volume:volume}
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
  return (
    // <Tooltip
    //   placement="right"
    //   TransitionComponent={Zoom}
    //   title={
    //     <Typography
    //       sx={{
    //         fontSize: "10px",
    //         fontFamily: "Bungee Hairline, cursive !important",
    //         fontWeight: "800 !important",
    //       }}
    //     >
    //       Upload any image type!
    //     </Typography>
    //   }
    // >
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
            backgroundColor: "#ec407a",

            "&:hover": {
              backgroundColor: "#ff77a9",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            },
            fontFamily: "Cinzel, serif",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 7px",
            color: "black",
            fill: "transparent",
            textTransform: "none",

            height: "40px",
            width: "10%",
            fontSize: ".8rem",
            borderRadius: "60px",
          }}
        >
          Upload
        </Button>
      </label>
    // </Tooltip>
  );
}
