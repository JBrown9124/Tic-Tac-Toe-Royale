import copy
from typing import *

class Choice:
    def __init__(self, move, value, depth):
        self.move = move
        self.value = value
        self.depth = depth

    def __str__(self):
        return str(self.move) + ": " + str(self.value)


class Move(object):
    def __init__(self, row_idx, tile_idx):
        self.row_idx = row_idx
        self.tile_idx = tile_idx

    def __repr__(self):
        return f"({self.row_idx},{self.tile_idx})"

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
class Bot(object):
    board_size = 0
    moves = []
    players = []
    win_by = 0
    player = 0
    

    def __init__(self):
        pass

    def evaluate_board(self):
        board = Board(size=self.board_size,moves=self.moves).board
        legal_moves:List[Move] = Board(size=self.board_size,moves=self.moves).get_legal_moves()

        # for move in self.moves:
        #     board[move["rowIdx"]][move["tileIdx"]] = move["playerNumber"]
        
        for row in board:
            print(f"{row}\n")
        print(legal_moves)
        return board

    def determine_next_move(self):
        pass

    def minimax(self, board, is_max, current_player, depth):
        # if board has a winner or is a tie
        # return with appropriate values
        winner = board.has_winner()
        last_move = board[-1]
        last_move_coords = last_move
        if winner == self.player:
            return Choice(last_move, 10 - depth, depth)
        elif winner != self.player:
            return Choice(last_move, -10 + depth, depth)
        elif len(self.moves) == self.win_by:
            return Choice(last_move, 0, depth)

        # otherwise, call minimax on each possible board combination
        candidate_choices = []
        candidates = board.get_legal_moves()
        for i in range(len(candidates)):
            row = candidates[i][0]
            col = candidates[i][1]
            newboard = copy.deepcopy(board)
            newboard.make_move(row, col, current_player)
            result = self.minimax(newboard, not is_max, current_player.other, depth + 1)
            result.move = newboard.last_move()
            candidate_choices.append(result)

        max_choice = None
        max_value = -100
        min_choice = None
        min_value = 100
        # determine which board combinations result in
        # best move for particular agent
        for i in range(len(candidate_choices)):
            choice = candidate_choices[i]
            if is_max and choice.value > max_value:
                max_choice = choice
                max_value = choice.value
            elif not is_max and choice.value < min_value:
                min_choice = choice
                min_value = choice.value

        # pick whichever move is the best for the
        # particular agent
        if is_max:
            return max_choice
        else:
            return min_choice

    def select_move(self, board):
        choice = self.minimax(self.board, True, self.player, 0)
        return choice.move


if __name__ == "__main__":
    bot = Bot()
    bot.moves = [
        {"playerNumber": 1, "rowIdx": 2, "tileIdx": 2},
        {"playerNumber": 2, "rowIdx": 1, "tileIdx": 2},
        {"playerNumber": 2, "rowIdx": 0, "tileIdx": 2},
    ]
    bot.board_size = 3
    bot.win_by = 3
    bot.player = 2
    bot.evaluate_board()
