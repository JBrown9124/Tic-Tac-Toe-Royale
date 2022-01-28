import { useEffect, useState } from "react";
import { Lobby } from "../Models/Lobby";
import { GameStatus } from "../Models/GameStatus";
import { socket } from "../socket";
import createLobby from "../creators/APICreators/createLobby";
import joinLobby from "../creators/APICreators/joinLobby";
import leaveLobby from "../creators/APICreators/leaveLobby";
import getStartGame from "../creators/APICreators/getStartGame";
import getGame from "../creators/APICreators/getLobby";
import useSound from "use-sound";
import { RgbaColor } from "react-colorful";
import { Move } from "../Models/Move";

interface UseCommandsProps {
  action: string;
  lobby: Lobby;
  lobbyId: number;
  setLobby: (lobby: Lobby) => void;
  setGameStatus: (gameStatus: GameStatus) => void;
  setHostColor: (color: RgbaColor) => void;
  setHostWinBy: (winBy: number) => void;
  setHostSize: (size: number) => void;
  setIsLobbyReceived: (isLobbyReceived: boolean) => void;
  setPieceSelection: (piece: string) => void;
  setIsLobbyFound: (isLobbyFound: boolean) => void;
  setLobbyId: (lobbyId: number) => void;
  setPlayerId: (playerId: string) => void;
  setPlayerName: (playerName: string) => void;
  playerName: string;
  playerId: string;
  setAction: (action: string) => void;
  isHost: boolean;
}

export default function useCommands({
  action,
  lobbyId,
  lobby,
  setLobby,
  setGameStatus,
  setHostColor,
  setHostWinBy,
  setHostSize,
  setIsLobbyReceived,
  setPieceSelection,
  setIsLobbyFound,
  setPlayerId,
  setLobbyId,
  isHost,
  setPlayerName,
  playerName,
  playerId,
  setAction,
}: UseCommandsProps) {
  const [playJoinOrStart] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/joinOrStartSound.mp3"
  );

  useEffect(() => {
    switch (action) {
      case "create":
        if (lobby.players.length === 0) {
          createLobby(playerName).then((response) => {
            if (response) {
              setLobbyId(response.lobby.lobbyId);
              setLobby(response.lobby);

              setPlayerId(response.playerId);
            }
          });
        }
        break;

      case "guest":
        const joinReqBody = {
          lobbyId: lobbyId,
          playerName: playerName,
          sessionId: socket.id,
        };

        joinLobby(joinReqBody).then((response) => {
          if (typeof response === "string") {
            setAction("join");
            setIsLobbyFound(false);
          } else {
            setIsLobbyFound(true);
            setLobbyId(response.lobby.lobbyId);
            setPlayerId(response.player.playerId);
            setLobby(response.lobby);

            playJoinOrStart();
          }
        });
        break;

      case "leave":
        const leaveReqBody = {
          lobbyId: lobbyId,
          player: {
            name: playerName, //Give player's name to signify to function that it should send a socket message
            piece: "Not Needed",
            isHost: isHost,
            isReady: false,
            playerId: playerId,
            playerLoaded: false,
            sessionId: socket.id,
            inventory: [],
          },
          hostSid: lobby.hostSid,
        };

        leaveLobby(leaveReqBody).then(() => {
          setLobby({
            hostSid: 0,
            lobbyId: 0,
            board: {
              size: 3,
              color: { r: 255, g: 255, b: 255, a: 0.9 },
              winBy: 3,
              moves: [],
            },
            players: [],
            gameStatus: {
              win: { whoWon: null, type: null, winningMoves: null },
              newMove: { playerId: "", rowIdx: 0, tileIdx: 0 },
              whoTurn: "",
              newPowerUpUse: {
                powerUp: {
                  value: 0,
                  name: "",
                  description: "",
                  imgUrl: "",
                  id: "",
                  rules: {
                    affectsCaster: false,
                    direction: {
                      isVertical: false,
                      isHorizontal: false,
                      isDiagonal: false,
                    },
                    castAnywhere: false,
                    tilesAffected: 0,
                    mustBeEmptyTile: false,
                    areaShape: "line",
                  },
                  selectColor: "",
                },
                selectedPowerUpTiles: [],
              },
            },
          });
          setGameStatus({
            win: { whoWon: null, type: null, winningMoves: null },
            newMove: { playerId: "", rowIdx: 0, tileIdx: 0 },
            whoTurn: "",
            newPowerUpUse: {
              powerUp: {
                value: 0,
                name: "",
                description: "",
                imgUrl: "",
                id: "",
                rules: {
                  affectsCaster: false,
                  direction: {
                    isVertical: false,
                    isHorizontal: false,
                    isDiagonal: false,
                  },
                  castAnywhere: false,
                  tilesAffected: 0,
                  mustBeEmptyTile: false,
                  areaShape: "line",
                },
                selectColor: "",
              },
              selectedPowerUpTiles: [],
            },
          });

          setIsLobbyReceived(false);
          setIsLobbyFound(true);
        });
        break;

      case "begin":
        setTimeout(() => {
          getStartGame(
            {
              lobbyId: lobbyId,
              playerId: null,
              hostSid: lobby.hostSid,
            },
            setGameStatus,
            setLobby,
            setIsLobbyReceived
          );
        }, 5000);
    }
  }, [action]);
}
