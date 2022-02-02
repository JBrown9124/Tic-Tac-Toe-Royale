import {useEffect} from "react"
import {Player} from "../Models/Player"
import {Lobby} from "../Models/Lobby"
import getPlayerPieces from "../creators/BoardCreators/getPlayerPieces"
import createBoard from "../creators/BoardCreators/createBoard"

interface useBoardCreatorProps{
action:string,
isLobbyReceived: boolean,
playerPieces:Player[],
playerId:string,
lobby:Lobby,
sizeOfBoardPiece: { mobile: string; desktop: string },
setPiece: (piece:string|JSX.Element) => void,
setBoard:(board:(string|number)[][]) =>void,
setAction:(action:string) => void
setIsHost:(isHost: boolean)=> void;
setIsBoardCreated:(isBoardCreated: boolean)=> void;
}

export default function useBoardCreator({action,
    isLobbyReceived,
    playerPieces,
    playerId,
    lobby,
    setPiece,
    setBoard,
    setAction, setIsHost, setIsBoardCreated,sizeOfBoardPiece}:useBoardCreatorProps){
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
}