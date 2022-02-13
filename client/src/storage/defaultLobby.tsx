const defaultLobby ={
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
      whoTurn: "",
      newMove: { playerId: "", rowIdx: 0, columnIdx: 0 },
      newPowerUpUse: {
        powerUp: {
          value: 0,
          name: "",
          description: "",
          imgUrl: "",
          cursorUrl:"",
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
          quantity: 0
        },
        selectedPowerUpTiles: [],
      },  fireTiles:[]
    },
  }

export default defaultLobby