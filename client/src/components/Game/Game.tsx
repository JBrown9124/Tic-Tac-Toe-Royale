import Grid from "@mui/material/Grid";
import { Player } from "../../Models/Player";
import { useState, useEffect, useLayoutEffect, useMemo } from "react";
import determineWinner from "../../creators/BoardCreators/determineWinner";
import createBoard from "../../creators/BoardCreators/createBoard";
import { useCookies } from "react-cookie";
import getPlayerPieces from "../../creators/BoardCreators/getPlayerPieces";
import botNewMove from "../../creators/APICreators/botNewMove";
import { Lobby } from "../../Models/Lobby";
import { NewMove } from "../../Models/NewMove";
import { GameStatus } from "../../Models/GameStatus";
import { determineSizeOfPiece } from "../../creators/BoardCreators/sizeOfPiece";
import { useSound } from "use-sound";
import Board from "./Board/Board";
import StatusBoardAnimator from "../../animators/StatusBoardAnimator";
import StatusBoard from "./StatusBoard/StatusBoard";
import CountDownAnimator from "../../animators/CountDownAnimator";
import useMoveHandler from "../../hooks/useMoveHandler";
import updateAfterPlayerLeaves from "../../creators/BoardCreators/updateAfterPlayerLeaves";
import TurnOrder from "./TurnOrder/TurnOrder";
import Inventory from "./Inventory/Inventory";
import { PowerUp } from "../../Models/PowerUp";

interface GameProps {
  lobby: Lobby;
  gameStatus: GameStatus;
  isLobbyReceived: boolean;
  setGameStatus: (status: GameStatus) => void;
  action: string;
  setAction: (action: string) => void;
  playerId: string;
  isHost: boolean;
  setIsHost: (isHost: boolean) => void;
  playerWhoLeftSessionId: string;
  setIsLobbyReceived: (isLobbyReceived: boolean) => void;
  handleStart: () => void;
  pieceSelection: string;
  setCursor: (url: string) => void;
}

export default function Game({
  lobby,
  gameStatus,
  setGameStatus,
  isLobbyReceived,
  action,
  setAction,
  playerId,
  isHost,
  setIsHost,
  playerWhoLeftSessionId,
  setIsLobbyReceived,
  pieceSelection,
  setCursor,
  handleStart,
}: GameProps) {
  const [playLeaveSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/floorDrumBackButton.mp3"
  );
  // const [cursor, setCursor] = useState("")
  const [isBoardCreated, setIsBoardCreated] = useState(false);
  const [botCanMove, setBotCanMove] = useState(false);
  const [isCountDownFinished, setIsCountDownFinished] = useState(false);
  const [piece, setPiece] = useState<JSX.Element | string>("");
  const [inventory, setInventory] = useState<PowerUp[]>([]);
  const [board, setBoard] = useState<(number | string)[][]>([[]]);
  const [playerPieces, setPlayerPieces] = useState<Player[]>([]);
  const sizeOfBoardPiece = determineSizeOfPiece(lobby?.board?.size);
  const [selectedPowerUp, setSelectedPowerUp] = useState<PowerUp>({
    value: 0,
    name: "",
    description: "",
    imgUrl: "",
    id:"",
  });

  useEffect(() => {
    updateAfterPlayerLeaves({
      playerPieces,
      setPlayerPieces,
      setGameStatus,
      gameStatus,
      playerWhoLeftSessionId,
      playerId,
    });
  }, [playerWhoLeftSessionId]);

  useMoveHandler({
    botCanMove,
    lobby,
    gameStatus,
    isHost,
    action,
    board,
    setGameStatus,

    playerPieces,
    playerWhoLeftSessionId,
    isBoardCreated,
    playerId,
    inventory,
  });

  const quitGame = () => {
    playLeaveSound();
    setBotCanMove(false);
    setIsCountDownFinished(false);
    setIsBoardCreated(false);
    setIsHost(false);

    setTimeout(() => {
      setAction("leave");
    }, 3500);
  };

  useEffect(() => {
    /*For when user hits play again */
    if (action === "begin" && botCanMove) {
      setBotCanMove(false);
      setIsCountDownFinished(false);
      setIsBoardCreated(false);
      setIsLobbyReceived(false);
    }
  }, [action]);

  useEffect(() => {
    if (action === "begin" && isLobbyReceived) {
      const setUpGame = async () => {
        /* When user hits play gain we wont need to convert pieces */
        if (playerPieces.length === 0) {
          await getPlayerPieces(
            playerId,
            lobby.players,
            setPiece,
            sizeOfBoardPiece,
            lobby.board.color,
            setIsHost,
            playerPieces
          );
        }

        const boardCreated = await createBoard(
          setBoard,
          lobby.board.size,
          lobby.board.moves
        );

        setIsBoardCreated(boardCreated);
        setAction("in game");
      };
      if (lobby.board.color) {
        setUpGame();
      }
    }
  }, [isLobbyReceived]);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent={{ lg: "normal", md: "center", xs: "center" }}
        spacing={{ lg: 0, md: 0, xs: 2 }}
      >
        <Grid
          item
          sm={12}
          container
          alignItems="center"
          justifyContent={{ lg: "right", md: "center", xs: "center" }}
          md={12}
          lg={2}
          spacing={0}
        >
          <StatusBoardAnimator
            fromX={-100}
            isVisible={isCountDownFinished}
            delay={800}
          >
            <Grid item>
              <StatusBoard
                handleStart={() => handleStart()}
                isHost={isHost}
                isCountDownFinished={isCountDownFinished}
                isBoardCreated={isBoardCreated}
                setPlayerPieces={(props) => setPlayerPieces(props)}
                winBy={lobby.board.winBy}
                gameStatus={gameStatus}
                playerPieces={playerPieces}
                quitGame={() => quitGame()}
                playerId={playerId}
              />
            </Grid>
            <Grid item sx={{ p: 3 }}>
              <Inventory
                selectedPowerUp={selectedPowerUp}
                inventory={inventory}
                setCursor={(props) => setCursor(props)}
                setSelectedPowerUp={(props) => setSelectedPowerUp(props)}
              />
            </Grid>
          </StatusBoardAnimator>
        </Grid>

        <Grid
          item
          sm={12}
          sx={{ marginTop: "40px" }}
          justifyContent="center"
          md={12}
          lg={8}
        >
          <Board
            inventory={inventory}
            playerId={playerId}
            isCountDownFinished={isCountDownFinished}
            boardColor={lobby.board.color}
            gameStatus={gameStatus}
            setGameStatus={(props) => setGameStatus(props)}
            winBy={lobby.board.winBy}
            lobbyId={lobby.lobbyId}
            lobbyHostSid={lobby.hostSid}
            board={board}
            sizeOfBoardPiece={sizeOfBoardPiece}
            playerPieces={playerPieces}
            piece={piece}
            boardSize={lobby.board.size}
          />
        </Grid>
        <Grid
          item
          sm={12}
          container
          alignItems="center"
          textAlign="center"
          justifyContent={{ md: "center", sm: "center" }}
          md={12}
          lg={1}
          direction="column"
        >
          <StatusBoardAnimator
            fromX={100}
            isVisible={isCountDownFinished}
            delay={800}
          >
            <TurnOrder
              playerWhoLeftSessionId={playerWhoLeftSessionId}
              whoTurn={gameStatus.whoTurn}
              playerId={playerId}
              gameStatus={gameStatus}
              isCountDownFinished={isCountDownFinished}
              isBoardCreated={isBoardCreated}
              setPlayerPieces={(props) => {
                setPlayerPieces(props);
              }}
              playerPieces={playerPieces}
            />
          </StatusBoardAnimator>
        </Grid>
      </Grid>
      {!isCountDownFinished && isBoardCreated && (
        <Grid
          container
          sx={{
            position: "absolute",
            top: "43%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <CountDownAnimator
            boardColor={lobby.board.color}
            startCountDown={isBoardCreated}
            setBotCanMove={(props) => setBotCanMove(props)}
            setIsCountDownFinished={(props) => setIsCountDownFinished(props)}
            fromScale={0}
          />
        </Grid>
      )}
    </>
  );
}
