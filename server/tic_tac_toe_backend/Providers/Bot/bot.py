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
    def __init__(self, row_idx, tile_idx, player_number=0):
        self.row_idx = row_idx
        self.tile_idx = tile_idx
        self.player_number = player_number

    def __repr__(self):
        return f"({self.player_number}:{self.row_idx},{self.tile_idx})"


class Board(object):
    def __init__(self, size, moves):
        self.size = size
        self.board = [[0 for _ in range(size)] for _ in range(size)]
        for move in moves:

            self.board[move["row_idx"]][move["tile_idx"]] = move["player_number"]

    def get_legal_moves(self):
        legal_moves = []
        for row_i in range(self.size):
            for tile_i in range(self.size):
                if self.board[row_i][tile_i] == 0:
                    legal_moves.append(Move(row_idx=row_i, tile_idx=tile_i))
        return legal_moves


class WinningDistance(object):
    def __init__(self, placement, type):
        self.placement = placement
        self.type = type

    def __repr__(self):
        return f"{self.type}:{self.placement}"


class NewMove(object):
    def __init__(self, coordinates, from_move):
        self.coordinates = coordinates
        self.from_move = from_move

    def __repr__(self):
        return f"{self.from_move}:{self.coordinates}"


class Placement(object):
    def __init__(self, direction, destination):
        self.direction = direction
        self.destination = destination

    def __repr__(self):
        return f"{self.direction}:{self.destination}"


class Bot(object):

    players = []
    win_by = 0
    player_making_move = 0

    def __init__(self, board_size, moves, win_by):
        self.moves = moves
        self.board_size = board_size
        self.win_by = win_by
        self.board = Board(size=self.board_size, moves=self.moves).board

    def evaluate_board(self):
        board = Board(size=self.board_size, moves=self.moves).board
        legal_moves: List[Move] = Board(
            size=self.board_size, moves=self.moves
        ).get_legal_moves()

        # for move in self.moves:
        #     board[move["row_idx"]][move["tile_idx"]] = move["player_number"]

        for row in board:
            print(f"{row}\n")

        return board

    def find_move(self):
        for move in self.moves:
            if move["player_number"] == self.player_making_move:
                move = Move(
                    row_idx=move["row_idx"],
                    tile_idx=move["tile_idx"],
                    player_number=move["player_number"],
                )

                self.find_winning_move(move.row_idx, move.tile_idx, move.player_number)

    def find_winning_move(self, row_idx, tile_idx, player_number):
        def checkHorizontal():
            left_idx = tile_idx
            right_idx = tile_idx

            while left_idx > 0 and self.board[row_idx][tile_idx - 1] == 0:
                left_idx -= 1

            while (
                right_idx < self.board_size - 1
                and self.board[row_idx][right_idx + 1] == 0
            ):
                right_idx += 1

            win_distance = (
                right_idx - left_idx if right_idx - left_idx + 1 >= self.win_by else 0
            )
            if win_distance > 0:
                placement = (
                    Placement("right", left_idx)
                    if left_idx > right_idx
                    else Placement("left", right_idx)
                )
                return placement

            return Placement("bottom", 0)

        def checkVertical():

            top_idx = row_idx
            bottom_idx = row_idx

            while top_idx > 0 and self.board[top_idx - 1][tile_idx] == 0:
                top_idx -= 1

            while (
                bottom_idx < self.board_size - 1
                and self.board[bottom_idx + 1][tile_idx] == 0
            ):
                bottom_idx += 1

            win_distance = (
                bottom_idx - top_idx if bottom_idx - top_idx + 1 >= self.win_by else 0
            )
            if win_distance > 0:
                placement = (
                    Placement("bottom", top_idx)
                    if top_idx > bottom_idx
                    else Placement("top", bottom_idx)
                )
                return placement

            return Placement("bottom", 0)

        # named after bottom are of move diagonol direction
        def checkDiagonalLeft():
            left = [row_idx, tile_idx]
            right = [row_idx, tile_idx]
            while (
                left[0] < self.board_size - 1
                and left[1] > 0
                and self.board[left[0] + 1][left[1] - 1] == 0
            ):

                left[0] += 1
                left[1] -= 1

            while (
                right[0] > 0
                and right[1] < self.board_size - 1
                and self.board[right[0] - 1][right[1] + 1] == 0
            ):

                right[0] -= 1
                right[1] += 1

            win_distance = (
                right[1] - left[1] if right[1] - left[1] + 1 >= self.win_by else 0
            )
            if win_distance > 0:
                placement = (
                    Placement("left", right[1])
                    if right[1] > left[1]
                    else Placement("right", left[1])
                )
                return placement

            return Placement("bottom", 0)

        # named after bottom are of move diagonol direction
        def checkDiagonalRight():
            left = [row_idx, tile_idx]
            right = [row_idx, tile_idx]
            while (
                right[0] < self.board_size - 1
                and right[1] < self.board_size - 1
                and self.board[right[0] + 1][right[1] + 1] == 0
            ):

                right[0] += 1
                right[1] += 1

            while (
                left[0] > 0
                and left[1] > 0
                and self.board[left[0] - 1][left[1] - 1] == 0
            ):

                left[0] -= 1
                left[1] -= 1

            win_distance = (
                right[1] - left[1] if right[1] - left[1] + 1 >= self.win_by else 0
            )
            if win_distance > 0:
                placement = (
                    Placement("left", right[1])
                    if right[1] > left[1]
                    else Placement("right", left[1])
                )
                return placement
            return Placement("bottom", 0)

        move = Move(row_idx=row_idx, tile_idx=tile_idx, player_number=player_number)
        horizontal = WinningDistance(checkHorizontal(), "horizontal")
        vertical = WinningDistance(checkVertical(), "vertical")
        diagonal_left = WinningDistance(checkDiagonalLeft(), "diagonal_left")
        diagonal_right = WinningDistance(checkDiagonalRight(), "diagonal_right")
        best_placement = WinningDistance(0, "vertical")
        if horizontal.placement.destination > 0:
            best_placement = horizontal
        if vertical.placement.destination:
            best_placement = vertical
        if diagonal_right.placement.destination > 0:
            best_placement = diagonal_right
        if diagonal_left.placement.destination > 0:
            best_placement = diagonal_left
        new_move = NewMove(best_placement, move)
        self.make_move(new_move)
        print(new_move)
        return new_move

    def make_move(new_move: NewMove):
        pass

    # def minimax(self, board, is_max, current_player, depth):
    #     # if board has a winner or is a tie
    #     # return with appropriate values
    #     winner = board.has_winner()
    #     last_move = board[-1]
    #     last_move_coords = last_move
    #     if winner == self.player:
    #         return Choice(last_move, 10 - depth, depth)
    #     elif winner != self.player:
    #         return Choice(last_move, -10 + depth, depth)
    #     elif len(self.moves) == self.win_by:
    #         return Choice(last_move, 0, depth)

    #     # otherwise, call minimax on each possible board combination
    #     candidate_choices = []
    #     candidates = board.get_legal_moves()
    #     for i in range(len(candidates)):
    #         row = candidates[i][0]
    #         col = candidates[i][1]
    #         newboard = copy.deepcopy(board)
    #         newboard.make_move(row, col, current_player)
    #         result = self.minimax(newboard, not is_max, current_player.other, depth + 1)
    #         result.move = newboard.last_move()
    #         candidate_choices.append(result)

    #     max_choice = None
    #     max_value = -100
    #     min_choice = None
    #     min_value = 100
    #     # determine which board combinations result in
    #     # best move for particular agent
    #     for i in range(len(candidate_choices)):
    #         choice = candidate_choices[i]
    #         if is_max and choice.value > max_value:
    #             max_choice = choice
    #             max_value = choice.value
    #         elif not is_max and choice.value < min_value:
    #             min_choice = choice
    #             min_value = choice.value

    #     # pick whichever move is the best for the
    #     # particular agent
    #     if is_max:
    #         return max_choice
    #     else:
    #         return min_choice

    # def select_move(self, board):
    #     choice = self.minimax(self.board, True, self.player, 0)
    #     return choice.move


if __name__ == "__main__":
    moves = [
        {"player_number": 1, "row_idx": 2, "tile_idx": 2},
        {"player_number": 2, "row_idx": 1, "tile_idx": 2},
        {"player_number": 2, "row_idx": 0, "tile_idx": 2},
    ]
    bot = Bot(win_by=3, board_size=3, moves=moves)

    bot.board_size = 3
    bot.win_by = 3
    bot.player_making_move = 2
    bot.evaluate_board()
    bot.find_move()
