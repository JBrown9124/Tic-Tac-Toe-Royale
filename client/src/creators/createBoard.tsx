const createBoard = (setCacheBoard:Function, setBoard:Function, boardSize:number, setSessionCookies:Function, sessionCookies:any): void => {
    let board: number[][] = [];
    
    for (let i = 0; i < boardSize; i++) {
      let row: number[] = [];

      for (let j = 0; j < boardSize; j++) {
        row.push(0);
      }
      board.push(row);
    }
    // if (sessionCookies?.boardMoves!==undefined){
    //   sessionCookies?.boardMoves?.map((move:any)=>board[move.rowIdx][move.tileIdx]=move.playerNumber)
    // }
    // let row:  number[] = Array(boardSize).fill(0);
    // let board: number[][] = Array(boardSize).fill(row);
    console.log(board, "BOARD");
    setCacheBoard(board);
    setBoard(board);
    
  };
export default createBoard;