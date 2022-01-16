import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CustomButton from "../../CustomButton";
import { useState } from "react";

interface CopyLobbyIdProps {
  lobbyId: number;
}
const CopyLobbyId = ({ lobbyId }: CopyLobbyIdProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLobbyId = () => {
    navigator.clipboard.writeText(String(lobbyId));
    setIsCopied(true);
  };
  return (
    <Grid
      textAlign="right"
      justifyContent="right"
      container
      direction="row"
      spacing={2}
      item
    >
      <Grid item>
        <CustomButton
          sx={{
            
            height: "25px",
          }}
          onClick={() => {
            handleCopyLobbyId();
          }}
          message={!isCopied ? "Copy ID to clipboard" : "Copied!"}
        />
      </Grid>
      <Grid item>
        <Typography
          sx={{ fontFamily: "Bungee Hairline, cursive", fontWeight: 800 }}
        >
          Lobby ID: {lobbyId}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default CopyLobbyId;
