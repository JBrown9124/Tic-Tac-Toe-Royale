import Grid from "@mui/material/Grid";
import { Player } from "../../Models/Player";
import { useState, useEffect} from "react";
import { defaultPowerUp } from "../../storage/defaultPowerUp";
import { Lobby } from "../../Models/Lobby";
import { Move } from "../../Models/Move";
import { GameStatus } from "../../Models/GameStatus";
import { determineSizeOfPiece } from "../../creators/BoardCreators/sizeOfPiece";
import { useSound } from "use-sound";
import Board from "./Board/Board";
import StatusBoardAnimator from "../../animators/StatusBoardAnimator";
import StatusBoard from "./StatusBoard/StatusBoard";
import CountDownAnimator from "../../animators/CountDownAnimator";
import useMoveHandler from "../../hooks/useMoveHandler/useMoveHandler";
import useBoardCreator from "../../hooks/useBoardCreator";
import updateAfterPlayerLeaves from "../../creators/BoardCreators/updateAfterPlayerLeaves";
import TurnOrder from "./TurnOrder/TurnOrder";
import Inventory from "./Inventory/Inventory";
import { PowerUp, PowerUps } from "../../Models/PowerUp";
import { powerUps } from "../../storage/powerUps";
import SelectedPower from "./SelectedPower/SelectedPower";
import onFinish from "../../creators/BoardCreators/onFinish";

interface GameProps {
  lobby: Lobby;
  gameStatus: GameStatus;
  isLobbyReceived: boolean;
  action: string;
  playerId: string;
  isHost: boolean;
  playerWhoLeftSessionId: string;
  pieceSelection: string;

  setGameStatus: (status: GameStatus) => void;
  setAction: (action: string) => void;
  setIsHost: (isHost: boolean) => void;
  setCursor: (url: string) => void;
  setIsLobbyReceived: (isLobbyReceived: boolean) => void;
  handleStart: () => void;
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

  const [isBoardCreated, setIsBoardCreated] = useState(false);
  const [botCanMove, setBotCanMove] = useState(false);
  const [isCountDownFinished, setIsCountDownFinished] = useState(false);

  const [piece, setPiece] = useState<JSX.Element | string>("");
  const [inventory] = useState<PowerUps>(powerUps);

  const [board, setBoard] = useState<(number | string)[][]>([[]]);
  const [playerPieces, setPlayerPieces] = useState<Player[]>([]);

  const [isUsingPowerUp, setIsUsingPowerUp] = useState(false);
  const [selectedPowerUp, setSelectedPowerUp] =
    useState<PowerUp>(defaultPowerUp);
  const [selectedPowerUpTiles, setSelectedPowerUpTiles] = useState<Move[]>([]);

  const sizeOfBoardPiece = determineSizeOfPiece(lobby?.board?.size);

  useMoveHandler({
    botCanMove,
    lobby,
    gameStatus,
    isHost,
    board,
    setGameStatus,
    playerPieces,
    playerWhoLeftSessionId,
    isBoardCreated,
    playerId,
    inventory,
  });

  useBoardCreator({
    action,
    isLobbyReceived,
    playerPieces,
    playerId,
    lobby,
    setPiece,
    setBoard,
    setAction,
    setIsHost,
    setIsBoardCreated,
    sizeOfBoardPiece,
  });

  /*For when user hits play again */
  useEffect(() => {
    if (action === "begin" && botCanMove) {
      setBotCanMove(false);
      setIsCountDownFinished(false);
      setIsBoardCreated(false);
      setIsLobbyReceived(false);
      setIsUsingPowerUp(false);

      setSelectedPowerUpTiles([]);
      setSelectedPowerUp(defaultPowerUp);
    }
  }, [action]);

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

  const quitGame = () => {
    playLeaveSound();

    setBotCanMove(false);
    setIsCountDownFinished(false);
    setIsBoardCreated(false);
    setIsHost(false);

    // Lets board destructure animation do its thing
    setTimeout(() => {
      setAction("leave");
    }, 3500);
  };
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent={{ xl:"normal", lg: "center", md: "center", xs: "center" }}
        spacing={{ lg: 0, md: 0, xs: 0 }}
      >
        <Grid
          item
          sm={12}
          container
          alignItems="center"
          justifyContent={{ xl:"right", lg: "center", md: "center", xs: "center" }}
          md={12}
          lg={12}
          xl={2}
          spacing={0}
        >
          <StatusBoardAnimator
            fromX={-100}
            isVisible={isCountDownFinished}
            delay={800}
          >
            <Grid container direction="row">
            <Grid item sx={{ p: 1 }} xs={6}  sm={6} md={6} lg={6} xl={12}>
              <StatusBoard
                inventory={inventory}
                setSelectedPowerUpTiles={(props) => {
                  setSelectedPowerUpTiles(props);
                }}
                isUsingPowerUp={isUsingPowerUp}
                setIsUsingPowerUp={(props) => setIsUsingPowerUp(props)}
                setSelectedPowerUp={(props) => setSelectedPowerUp(props)}
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
            
            {isUsingPowerUp && (
              // <SelectedPowerComponentAnimator delay={0} isUsingPowerUp={isUsingPowerUp} fromScale={0}>
              <Grid item sx={{ p: 1 }} xs={12} sm={12} md={12} lg={12} xl={12}>
                <SelectedPower
                  onFinish={() =>
                    onFinish(
                      selectedPowerUp,
                      gameStatus,
                      selectedPowerUpTiles,
                      lobby,
                      inventory,
                      setSelectedPowerUpTiles,
                      setSelectedPowerUp,
                      setIsUsingPowerUp,
                      setGameStatus,
                      board,
                      playerId
                    )
                  }
                  selectedPowerUpTiles={selectedPowerUpTiles}
                  selectedPowerUp={selectedPowerUp}
                />
              </Grid>
              // </SelectedPowerComponentAnimator>
            )}

           
            </Grid>
          </StatusBoardAnimator>
        </Grid>

        <Grid
          item
          sm={12}
          sx={{  }}
          justifyContent="center"
          md={12}
          lg={12}
          xl={8}
        >
          <Board
            // powerOrMove={powerOrMove}
            isUsingPowerUp={isUsingPowerUp}
            selectedPowerUp={selectedPowerUp}
            setSelectedPowerUpTiles={(props) => setSelectedPowerUpTiles(props)}
            selectedPowerUpTiles={selectedPowerUpTiles}
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
            <Inventory
                isBoardCreated={isBoardCreated}
                // powerOrMove={powerOrMove}
                isUsingPowerUp={isUsingPowerUp}
                setIsUsingPowerUp={(props) => setIsUsingPowerUp(props)}
                setSelectedPowerUpTiles={(props) =>
                  setSelectedPowerUpTiles(props)
                }
                selectedPowerUp={selectedPowerUp}
                inventory={inventory}
                setCursor={(props) => setCursor(props)}
                setSelectedPowerUp={(props) => setSelectedPowerUp(props)}
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
          lg={12}
          xl={2}
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
