import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { NewMove } from "../../Models/NewMove";
import Board from "./Board/Board";
import { useCookies } from "react-cookie";
import { Player } from "../../Models/Player";
import StatusBoardIn from "../../animators/StatusBoardIn";
import { useState, useEffect } from "react";
import { Lobby } from "../../Models/Lobby";
import { GameStatus } from "../../Models/GameStatus";
import makeNewMove from "../../creators/APICreators/makeNewMove";

import StatusBoard from "./StatusBoard/StatusBoard";
interface GameProps {
  newMove: NewMove;
  lobby: Lobby;
  gameStatus: GameStatus;
  isAllPlayersLoaded:boolean
  isLobbyReceived: boolean;
  setGameStatus: (status: GameStatus) => void;
  setNewMove:(newMoveValue:NewMove)=>void;
}
function Game({ newMove, lobby, gameStatus, setGameStatus, setNewMove, isLobbyReceived, isAllPlayersLoaded }: GameProps) {
  const [sessionCookies, setSessionCookies] = useCookies();
  const [turnNumber, setturnNumber] = useState(0);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    if (sessionCookies?.command === "begin") {
      lobby?.players?.map((player: Player) => {
        if (player.name === sessionCookies?.name) {
          if (player.isHost) {
            setIsHost(true);
          }
          return setturnNumber(player.turnNumber);
        }
      });
    }
  }, [sessionCookies?.command, lobby]);
  
  return (
    <>
      <Grid container direction="row" spacing={{ md: 0, xs: 2 }}>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent={{ md: "right", xs: "center" }}
          sx={{ marginTop: "10px" }}
          md={2}
        >
          <StatusBoardIn fromX={-100} isVisible={true} delay={800}>
            <StatusBoard
              winBy={lobby?.board?.winBy}
              gameStatus={gameStatus}
              players={lobby?.players}
              turnNumber={turnNumber}
            />
          </StatusBoardIn>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ marginTop: "120px" }}
          justifyContent="center"
          md={8}
        >
          <Board
          isLobbyReceived={isLobbyReceived}
          isAllPlayersLoaded={isAllPlayersLoaded}
            gameStatus={gameStatus}
            setGameStatus={(props) => setGameStatus(props)}
            lobby={lobby}
            newMove={newMove}
            isHost={isHost}
            turnNumber={turnNumber}
          />
        </Grid>
      </Grid>
    </>
  );
}
export default Game;
