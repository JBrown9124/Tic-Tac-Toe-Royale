import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState } from "react";

interface CopyLobbyIdProps{
  lobbyId: number
} 
const CopyLobbyId = ({lobbyId}:CopyLobbyIdProps) => {
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
        <Button
          onClick={() => {
            handleCopyLobbyId();
          }}
        >
          {!isCopied ? "Copy ID to clipboard" : "Copied!"}
        </Button>
      </Grid>
      <Grid item>
        <Typography>Lobby ID: {lobbyId}</Typography>
      </Grid>
    </Grid>
  );
};
export default CopyLobbyId;
