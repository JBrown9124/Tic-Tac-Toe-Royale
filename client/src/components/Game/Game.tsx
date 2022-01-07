import Grid from "@mui/material/Grid";
import { Player } from "../../Models/Player";
import BoardAnimator from "../../animators/BoardAnimator";
import { Tile } from "./Board/Tile";
import { useState, useEffect } from "react";
import determineWinner from "../../creators/BoardCreators/determineWinner";
import createBoard from "../../creators/BoardCreators/createBoard";
import { useCookies } from "react-cookie";
import getPlayerPieces from "../../creators/BoardCreators/getPlayerPieces";
import botNewMove from "../../creators/APICreators/botNewMove";
import { PlayerPieces } from "../../Models/PlayerPieces";
import { Lobby } from "../../Models/Lobby";
import { NewMove } from "../../Models/NewMove";
import { GameStatus } from "../../Models/GameStatus";
import { determineSizeOfPiece } from "../../creators/BoardCreators/sizeOfPiece";
import { useSound } from "use-sound";
import Board from "./Board/Board";
import StatusBoardAnimator from "../../animators/StatusBoardAnimator";
import StatusBoard from "./StatusBoard/StatusBoard";
import HashLoader from "react-spinners/HashLoader";
import Typography from "@mui/material/Typography";
interface GameProps {
  newMove: NewMove;
  lobby: Lobby;
  gameStatus: GameStatus;
  isLobbyReceived: boolean;
  setGameStatus: (status: GameStatus) => void;
  setNewMove: (newMoveValue: NewMove) => void;
}
function Game({
  newMove,
  lobby,
  gameStatus,
  setGameStatus,
  setNewMove,
  isLobbyReceived,
}: GameProps) {
  const [sessionCookie, setSessionCookie] = useCookies();
  const [turnNumber, setturnNumber] = useState(0);
  const [board, setBoard] = useState<number[][]>([[]]);

  const [botCanMove, setBotCanMove] = useState(false);
  const [piece, setPiece] = useState<JSX.Element | string>("");
  const [playerPieces, setPlayerPieces] = useState<PlayerPieces[]>([]);
  const [isBoardCreated, setIsBoardCreated] = useState(false);
  const sizeOfBoardPiece = determineSizeOfPiece(lobby?.board?.size);
  const [countDown, setCountDown] = useState(5);
  const [startOtherPlayerMoveSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/otherPlayerMoveSound.mp3"
  );
  const [isHost, setIsHost] = useState(false);
  const [startOpenSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/warHorn.mp3"
  );
  const [startCountDown, setStartCountDown] = useState(false);

  useEffect(() => {
    if (countDown >= 0) {
      const t = setTimeout(() => {
        setCountDown((state) => state - 1);
      }, 1000);
      return () => {
        clearTimeout(t);
      };
    } else if (countDown === -1) {
      startOpenSound();
      const t = setTimeout(() => {
        setBotCanMove(true);
      }, 5000);
      return () => {
        clearTimeout(t);
      };
    }
  }, [startCountDown, countDown]);
  useEffect(() => {
    if (sessionCookie.command === "begin") {
      const setUpGame = async () => {
        await getPlayerPieces(
          turnNumber,
          lobby.players,
          setPiece,
          sizeOfBoardPiece,
          setPlayerPieces,
          lobby.board.color
        );
        const boardCreated = await createBoard(
          setBoard,
          lobby.board.size,
          lobby.board.moves
        );

        setIsBoardCreated(boardCreated);
        setStartCountDown(true);
      };
      if (lobby.board.color) {
        setUpGame();
      }
    }
  }, [isLobbyReceived]);

  useEffect(() => {
    if (botCanMove) {
      const findIfBot = async () => {
        return lobby.players.find((player) => {
          return (
            player.turnNumber === gameStatus.whoTurn &&
            player.playerId.substring(0, 3) === "BOT"
          );
        });
      };
      findIfBot().then((nextIsBot) => {
        if (
          isHost &&
          nextIsBot !== undefined &&
          !gameStatus.win.whoWon &&
          botCanMove
        ) {
          const reqBody = {
            lobbyId: sessionCookie.lobbyId,
            playerId: nextIsBot.playerId,
            turnNumber: nextIsBot.turnNumber,
          };
          botNewMove(reqBody).then((botNewMoveResponse) => {
            if (botNewMoveResponse) {
              determineWinner(
                botNewMoveResponse.rowIdx,
                botNewMoveResponse.tileIdx,
                board,
                lobby.board.size,
                botNewMoveResponse.turnNumber,

                lobby.board.winBy,
                lobby.lobbyId,
                lobby.hostSid,
                setGameStatus
              );
            }
          });

          startOtherPlayerMoveSound();
        }
      });
    }
  }, [gameStatus, botCanMove]);
  useEffect(() => {
    if (newMove.turnNumber !== undefined && newMove.turnNumber !== 0) {
      board[newMove.rowIdx][newMove.tileIdx] = newMove.turnNumber;
      startOtherPlayerMoveSound();
    }
  }, [newMove]);

  useEffect(() => {
    if (sessionCookie?.command === "begin") {
      lobby?.players?.map((player: Player) => {
        if (player.name === sessionCookie?.name) {
          if (player.isHost) {
            setIsHost(true);
          }
          return setturnNumber(player.turnNumber);
        }
      });
    }
  }, [sessionCookie?.command, lobby]);
  const override = `
  display: block;
  margin: 0 auto;
  border-color: red;
`;
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
          <StatusBoardAnimator fromX={-100} isVisible={true} delay={800}>
            {countDown < 0 && isLobbyReceived && (
              <StatusBoard
                winBy={lobby?.board?.winBy}
                gameStatus={gameStatus}
                players={lobby?.players}
                turnNumber={turnNumber}
              />
            )}
          </StatusBoardAnimator>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ marginTop: "120px" }}
          justifyContent="center"
          md={8}
        >
          {countDown < 0 && isLobbyReceived ? (
            <Board
              isLobbyReceived={isLobbyReceived}
              isBoardCreated={isBoardCreated}
              boardColor={lobby.board.color}
              gameStatus={gameStatus}
              setGameStatus={(props) => setGameStatus(props)}
              winBy={lobby.board.winBy}
              lobbyId={lobby.lobbyId}
              lobbyHostSid={lobby.hostSid}
              newMove={newMove}
              isHost={isHost}
              turnNumber={turnNumber}
              board={board}
              sizeOfBoardPiece={sizeOfBoardPiece}
              playerPieces={playerPieces}
              piece={piece}
              boardSize={lobby.board.size}
            />
          ) : (
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                justifyContent: "center",
                fontSize: "6rem",
              }}
            >
              {countDown === 0 ? "Begin!" : countDown}
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
}
export default Game;
