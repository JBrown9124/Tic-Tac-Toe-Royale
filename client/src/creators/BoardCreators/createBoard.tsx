const createBoard = (
  setBoard: Function,
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
  // if (sessionCookies?.boardMoves!==undefined){
  //   sessionCookies?.boardMoves?.map((move:any)=>board[move.rowIdx][move.tileIdx]=move.turnNumber)
  // }
  // let row:  number[] = Array(boardSize).fill(0);
  // let board: number[][] = Array(boardSize).fill(row);

  setBoard([...board]);
  return new Promise((resolve, reject) => {
    resolve(true);
  });
};
export default createBoard;
