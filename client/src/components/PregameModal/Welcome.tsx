import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
interface OpenPageProps{
  startGame:()=>void

}
export default function Welcome({startGame}:OpenPageProps) {
  return (
    <>
      <Grid container sx={{ textAlign:"center"}} spacing={6}justifyContent="center">
        <Grid item> 
          <Typography variant="h2">Welcome To Tic Tac Toe Online!</Typography>
        </Grid>
        <Grid container item direction="column" sx={{}}justifyContent="center" >
          <Grid item xs={12}>
            <Button onClick={()=>startGame()}>Start a game</Button>
          </Grid>
          <Grid item xs={12}>
            <Button>Join a game</Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
