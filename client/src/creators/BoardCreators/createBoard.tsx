import getRandomInt from '../../utilities/getRandomInt'
import {powerUps} from "../../storage/powerUps"
const createBoard = async (
  setBoard: (boardValue: number[][]) => void,
  boardSize: number,
  moves: Object[]
): Promise<boolean> => {
  let board: number[][] = [];

  for (let i = 0; i < boardSize; i++) {
    let row: number[] = [];

    for (let j = 0; j < boardSize; j++) {
      row.push(getRandomInt(1,Object.keys(powerUps).length));
    }
    board.push(row);
  }

  moves?.map(
    (move: any) => (board[move.rowIdx][move.columnIdx] = move.playerId)
  );

  setBoard([...board]);
  return board.length > 0;
};
export default createBoard;
