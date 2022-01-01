from .move import Move
class Board(object):
    def __init__(self, size, moves):
        self.size = size
        self.board = [[0 for _ in range(size)] for _ in range(size)]
        for move in moves:

            self.board[move["rowIdx"]][move["tileIdx"]] = move["playerNumber"]

    def get_legal_moves(self):
        legal_moves = []
        for row_i in range(self.size):
            for tile_i in range(self.size):
                if self.board[row_i][tile_i] == 0:
                    legal_moves.append(Move(row_idx=row_i, tile_idx=tile_i))
        return legal_moves
