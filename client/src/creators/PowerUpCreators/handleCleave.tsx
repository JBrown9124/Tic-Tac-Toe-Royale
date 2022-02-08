import { PowerUp } from "../../Models/PowerUp";
import { Move } from "../../Models/Move";
const handleCleave = (selectedPowerUpTiles: Move[],
    playerId: string,
    rowIdx: number,
    columnIdx: number,
    boardSize: number,
    board: (number | string)[][],setSelectedPowerUpTiles:(selectedPowerUpTiles:Move[])=>void)=>{
   
    
    if (
        selectedPowerUpTiles.length === 0 &&
        board[rowIdx][columnIdx] === playerId
      ) {
        selectedPowerUpTiles.push({
          playerId: playerId,
          columnIdx: columnIdx,
          rowIdx: rowIdx,
        });
        setSelectedPowerUpTiles([...selectedPowerUpTiles]);
      }
      if (selectedPowerUpTiles.length > 0) {
        //right of player tile
        const selectedPlayerTile = selectedPowerUpTiles[0]
        if (
            selectedPlayerTile.columnIdx === columnIdx - 1 &&
            selectedPlayerTile.rowIdx === rowIdx &&
          rowIdx  > 0 &&
          rowIdx  < boardSize - 1
        ) {
          selectedPowerUpTiles.push({
            playerId: playerId,
            columnIdx: columnIdx,
            rowIdx: rowIdx - 1,
          });
          selectedPowerUpTiles.push({
            playerId: playerId,
            columnIdx: columnIdx,
            rowIdx: rowIdx,
          });
          selectedPowerUpTiles.push({
            playerId: playerId,
            columnIdx: columnIdx,
            rowIdx: rowIdx + 1,
          });
          setSelectedPowerUpTiles([...selectedPowerUpTiles]);
          // left of player tile
        } else if (
            selectedPlayerTile.columnIdx === columnIdx + 1 &&
            selectedPlayerTile.rowIdx === rowIdx &&
          rowIdx  > 0 &&
          rowIdx  < boardSize - 1
        ) {
          selectedPowerUpTiles.push({
            playerId: playerId,
            columnIdx: columnIdx,
            rowIdx: rowIdx - 1,
          });
          selectedPowerUpTiles.push({
            playerId: playerId,
            columnIdx: columnIdx,
            rowIdx: rowIdx,
          });
          selectedPowerUpTiles.push({
            playerId: playerId,
            columnIdx: columnIdx,
            rowIdx: rowIdx + 1,
          });
          setSelectedPowerUpTiles([...selectedPowerUpTiles]);
        }
        // top of player tile
        else if (
            selectedPlayerTile.columnIdx === columnIdx &&
            selectedPlayerTile.rowIdx === rowIdx+1 &&
            columnIdx  > 0 &&
            columnIdx  < boardSize - 1
          ) {
            selectedPowerUpTiles.push({
              playerId: playerId,
              columnIdx: columnIdx-1,
              rowIdx: rowIdx,
            });
            selectedPowerUpTiles.push({
              playerId: playerId,
              columnIdx: columnIdx,
              rowIdx: rowIdx,
            });
            selectedPowerUpTiles.push({
              playerId: playerId,
              columnIdx: columnIdx+1,
              rowIdx: rowIdx,
            });
            setSelectedPowerUpTiles([...selectedPowerUpTiles]);
          }
          //bottom of player tile
          else if (
            selectedPlayerTile.columnIdx === columnIdx &&
            selectedPlayerTile.rowIdx === rowIdx-1 &&
            columnIdx > 0 &&
            columnIdx < boardSize - 1
          ) {
            selectedPowerUpTiles.push({
              playerId: playerId,
              columnIdx: columnIdx-1,
              rowIdx: rowIdx,
            });
            selectedPowerUpTiles.push({
              playerId: playerId,
              columnIdx: columnIdx,
              rowIdx: rowIdx,
            });
            selectedPowerUpTiles.push({
              playerId: playerId,
              columnIdx: columnIdx+1,
              rowIdx: rowIdx,
            });
            setSelectedPowerUpTiles([...selectedPowerUpTiles]);
          }
          // top diagonal right
          else if (
            selectedPlayerTile.columnIdx === columnIdx-1 &&
            selectedPlayerTile.rowIdx === rowIdx+1 
           
          ) {
            selectedPowerUpTiles.push({
              playerId: playerId,
              columnIdx: columnIdx-1,
              rowIdx: rowIdx,
            });
            selectedPowerUpTiles.push({
              playerId: playerId,
              columnIdx: columnIdx,
              rowIdx: rowIdx,
            });
            selectedPowerUpTiles.push({
              playerId: playerId,
              columnIdx: columnIdx,
              rowIdx: rowIdx+1,
            });
            setSelectedPowerUpTiles([...selectedPowerUpTiles]);
          }
          //top diagonal left
          else if (
            selectedPlayerTile.columnIdx === columnIdx+1 &&
            selectedPlayerTile.rowIdx === rowIdx+1 
           
          ) {
            selectedPowerUpTiles.push({
              playerId: playerId,
              columnIdx: columnIdx+1,
              rowIdx: rowIdx,
            });
            selectedPowerUpTiles.push({
              playerId: playerId,
              columnIdx: columnIdx,
              rowIdx: rowIdx,
            });
            selectedPowerUpTiles.push({
              playerId: playerId,
              columnIdx: columnIdx,
              rowIdx: rowIdx+1,
            });
            setSelectedPowerUpTiles([...selectedPowerUpTiles]);
          }
          //bottom diagonal right
          else if (
            selectedPlayerTile.columnIdx === columnIdx-1 &&
            selectedPlayerTile.rowIdx === rowIdx-1 
           
          ) {
            selectedPowerUpTiles.push({
              playerId: playerId,
              columnIdx: columnIdx,
              rowIdx: rowIdx-1,
            });
            selectedPowerUpTiles.push({
              playerId: playerId,
              columnIdx: columnIdx,
              rowIdx: rowIdx,
            });
            selectedPowerUpTiles.push({
              playerId: playerId,
              columnIdx: columnIdx-1,
              rowIdx: rowIdx,
            });
            setSelectedPowerUpTiles([...selectedPowerUpTiles]);
          }
          //bottom diagonal left
          else if (
            selectedPlayerTile.columnIdx === columnIdx+1 &&
            selectedPlayerTile.rowIdx === rowIdx-1 
           
          ) {
            selectedPowerUpTiles.push({
              playerId: playerId,
              columnIdx: columnIdx,
              rowIdx: rowIdx-1,
            });
            selectedPowerUpTiles.push({
              playerId: playerId,
              columnIdx: columnIdx,
              rowIdx: rowIdx,
            });
            selectedPowerUpTiles.push({
              playerId: playerId,
              columnIdx: columnIdx+1,
              rowIdx: rowIdx,
            });
            setSelectedPowerUpTiles([...selectedPowerUpTiles]);
          }
      }
  
}
export default handleCleave