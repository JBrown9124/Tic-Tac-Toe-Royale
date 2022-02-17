import { Lobby } from "../../../Models/Lobby";
import { RefObject } from "react";
import { RgbaColor } from "react-colorful";

const updatePlayerLeavingLobby = async (
  lobbyRef: RefObject<Lobby>,
  actionRef: RefObject<string>,
  data: any,
  playerIdRef: RefObject<string>,
  setAction: (action: string) => void,
  setIsHost: (isHost: boolean) => void,
  setLobby: (lobby: Lobby) => void,
  setPlayerWhoLeftSessionId: (playerId: string) => void,
  setHostColor: (color: RgbaColor) => void,
  setHostWinBy: (winBy: number) => void,
  setHostSize: (size: number) => void
) => {
  const lobbyCopy = lobbyRef.current;
  if (lobbyCopy) {
    if (actionRef.current !== "begin" && actionRef.current !== "in game") {
      // let newPlayerList = lobbyCopy.players.filter((player) => {
      //   return player.playerId !== data.removedPlayer.playerId;
      // });

      const scanAndRemove = new Promise((resolve, reject) => {
        for (var i = lobbyCopy.players.length; i--; ) {
          if (lobbyCopy.players[i].playerId === data.removedPlayer.playerId) {
            resolve(lobbyCopy.players.splice(i, 1));
          }
        }
      });
      await scanAndRemove;
      if (data.newHost) {
        lobbyCopy.players.forEach((player) => {
          if (player.playerId === data.newHost.playerId) {
            player.isHost = true;
          }
        });

        if (data.newHost.playerId === playerIdRef.current) {
          setAction("create");
          setIsHost(true);
        }
      }

      setLobby({ ...lobbyCopy });
    } else if (
      actionRef.current === "begin" ||
      actionRef.current === "in game"
    ) {
      setPlayerWhoLeftSessionId(data.removedPlayer.sessionId);

      if (data.newHost.playerId === playerIdRef.current) {
        setIsHost(true);
        setHostColor(lobbyCopy.board.color);
        setHostWinBy(lobbyCopy.board.winBy);
        setHostSize(lobbyCopy.board.size);
      }
    }
  }
};
export default updatePlayerLeavingLobby;
