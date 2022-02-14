import Grid from "@mui/material/Grid";
import { Player } from "../../Models/Player";
import { useState, useEffect, useCallback, useContext } from "react";
import { defaultPowerUp } from "../../storage/defaultPowerUp";
import { Lobby } from "../../Models/Lobby";
import { Move } from "../../Models/Move";
import { GameStatus } from "../../Models/GameStatus";
import { determineSizeOfPiece } from "../../creators/BoardCreators/sizeOfPiece";
import { useSound } from "use-sound";
import { VolumeContext } from "../../storage/VolumeContext";
import Board from "./Board/Board";
import StatusBoardAnimator from "../../animators/StatusBoardAnimator";
import StatusBoard from "./StatusBoard/StatusBoard";
import CountDownAnimator from "../../animators/CountDownAnimator";
import useMoveHandler from "../../hooks/useMoveHandler/useMoveHandler";
import useBoardCreator from "../../hooks/useBoardCreator";
import updateAfterPlayerLeaves from "../../creators/BoardCreators/updateAfterPlayerLeaves";
import getDisplayPlayerPieces from "../../creators/BoardCreators/getDisplayPlayerPieces";
import TurnOrder from "./TurnOrder/TurnOrder";
import Inventory from "./Inventory/Inventory";
import { PowerUp, PowerUps } from "../../Models/PowerUp";
import { powerUps } from "../../storage/powerUps";
import SelectedPower from "./Inventory/SelectedPower";
import onFinish from "../../creators/BoardCreators/onFinish";
import fire from "../../img/fire.png";
import mcolbomb from "../../img/mcol-bomb.svg";

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
  setIsGuideOpen: (isGuideOpen: boolean) => void;
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
  setIsGuideOpen,
}: GameProps) {
  const volume = useContext(VolumeContext);
  const [playLeaveSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/floorDrumBackButton.mp3",
    { volume: volume }
  );

  const [isBoardCreated, setIsBoardCreated] = useState(false);
  const [botCanMove, setBotCanMove] = useState(false);
  const [isCountDownFinished, setIsCountDownFinished] = useState(false);

  const [piece, setPiece] = useState<JSX.Element | string>("");
  const [displayPiece, setDisplayPiece] = useState<JSX.Element | string>("");
  const [inventory] = useState<PowerUps>(powerUps);

  const [board, setBoard] = useState<(number | string)[][]>([[]]);
  const [playerPieces, setPlayerPieces] = useState<Player[]>([]);
  const [displayPlayerPieces, setDisplayPlayerPieces] = useState<Player[]>([]);

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
    displayPlayerPieces,
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
    setDisplayPiece,
    displayPlayerPieces,
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
      displayPlayerPieces,
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
    <Grid
      container
      direction={{ xs: "column", sm: "column", md: "column", lg: "row" }}
      justifyContent="center"
    >
      <Grid item sx={{ zIndex: 9999 }}>
        <StatusBoardAnimator
          fromX={-100}
          isVisible={isCountDownFinished}
          delay={800}
        >
          <StatusBoard
            setIsGuideOpen={(props) => setIsGuideOpen(props)}
            displayPiece={displayPiece}
            selectedPowerUp={selectedPowerUp}
            boardSize={lobby.board.size}
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
            playerPieces={displayPlayerPieces}
            quitGame={() => quitGame()}
            playerId={playerId}
            sizeOfBoardPiece={sizeOfBoardPiece}
          />
          {/* 
        {isUsingPowerUp && (

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
          )} */}
        </StatusBoardAnimator>
      </Grid>
      <Grid item sx={{}}>
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
        <StatusBoardAnimator
          fromY={100}
          isVisible={isCountDownFinished}
          delay={800}
        >
          <Inventory
            displayPiece={displayPiece}
            selectedPowerUpTiles={selectedPowerUpTiles}
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
            isBoardCreated={isBoardCreated}
            // powerOrMove={powerOrMove}
            isUsingPowerUp={isUsingPowerUp}
            setIsUsingPowerUp={(props) => setIsUsingPowerUp(props)}
            setSelectedPowerUpTiles={(props) => setSelectedPowerUpTiles(props)}
            selectedPowerUp={selectedPowerUp}
            inventory={inventory}
            setCursor={(props) => setCursor(props)}
            setSelectedPowerUp={(props) => setSelectedPowerUp(props)}
          />
        </StatusBoardAnimator>
      </Grid>
      <Grid>
        <StatusBoardAnimator
          fromX={100}
          isVisible={isCountDownFinished}
          delay={800}
        >
          <TurnOrder
            boardSize={lobby.board.size}
            playerWhoLeftSessionId={playerWhoLeftSessionId}
            sizeOfBoardPiece={sizeOfBoardPiece}
            whoTurn={gameStatus.whoTurn}
            playerId={playerId}
            gameStatus={gameStatus}
            isCountDownFinished={isCountDownFinished}
            isBoardCreated={isBoardCreated}
            setPlayerPieces={(props) => {
              setPlayerPieces(props);
            }}
            playerPieces={displayPlayerPieces}
          />
        </StatusBoardAnimator>
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
    </Grid>
  );
}
