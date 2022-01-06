const createBoard = async (
  setBoard: (boardValue: number[][]) => void,
  boardSize: number,
  moves: Object[]
): Promise<boolean> => {
  let board: number[][] = [];

  for (let i = 0; i < boardSize; i++) {
    let row: number[] = [];

    for (let j = 0; j < boardSize; j++) {
      row.push(0);
    }
    board.push(row);
  }

  moves?.map(
    (move: any) => (board[move.rowIdx][move.tileIdx] = move.turnNumber)
  );

  setBoard([...board]);
  return board.length > 0;
};
export default createBoard;
