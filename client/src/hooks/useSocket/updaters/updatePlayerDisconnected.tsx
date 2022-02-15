import { Lobby } from "../../../Models/Lobby";
import { RefObject } from "react";
import { RgbaColor } from "react-colorful";
import leaveLobby from "../../../creators/APICreators/leaveLobby";
const updatePlayerDisconnected = (
  lobbyRef: RefObject<Lobby>,
  playerId: string,
  playerSessionId: string,
  actionRef: RefObject<string>,
  setPlayerWhoLeftSessionId:(playerWhoLeftSessionId: string) => void,
  playerIdRef: RefObject<string>,
  setIsHost:(isHost: boolean) => void,
  setHostColor:(color: RgbaColor) => void,
  setHostWinBy: (winBy: number) => void,
  setHostSize:(size: number) => void,
  setAction:(action: string) => void,
  setLobby:(lobby: Lobby) => void
) => {
  const lobbyCopy = lobbyRef.current;
  if (lobbyCopy) {
    const reqBody = {
      lobbyId: lobbyCopy.lobbyId,
      player: {
        name: null,
        piece: "Not Needed",
        isHost: false,
        inventory: {},
        isReady: false,
        playerId: playerId,
        playerLoaded: false,
        sessionId: playerSessionId,
      },
      hostSid: lobbyCopy.hostSid,
    };
    leaveLobby(reqBody).then((response) => {
      if (response) {
        const { data } = response;
        const { newHost, lobby } = data;
        console.log(lobby,"LOBBY")
        if (actionRef.current === "begin" || actionRef.current === "in game") {
          setPlayerWhoLeftSessionId(playerSessionId);
          if (newHost && newHost.playerId === playerIdRef.current) {
            setIsHost(true);

            setHostColor(lobbyCopy.board.color);
            setHostWinBy(lobbyCopy.board.winBy);
            setHostSize(lobbyCopy.board.size);
          }
        }

        if (
          actionRef.current !== "begin" &&
          actionRef.current !== "in game" &&
          newHost &&
          newHost.playerId === playerIdRef.current
        ) {
          setAction("create");
          setLobby({...lobby});
          setIsHost(true);
        }
      }
    });
  }
};
export default updatePlayerDisconnected;
