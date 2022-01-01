import copy
from typing import *
from .BotModels.bot_board import Board
from .BotModels.choice import Choice
from .BotModels.move import Move
from .BotModels.new_move import NewMove
from .BotModels.placement import Placement
import random


class Bot(object):

   

    def __init__(self, board_size, moves, win_by, player_making_move):
        self.player_making_move = player_making_move
        self.moves = moves
        self.board_size = board_size
        self.win_by = win_by
        self.board = Board(size=self.board_size, moves=self.moves).board

    def evaluate_board(self):
        board = Board(size=self.board_size, moves=self.moves).board
        

        # for move in self.moves:
        #     board[move["row_idx"]][move["tile_idx"]] = move["player_number"]

        for row in board:
            print(f"{row}\n")

        return board

    def scan_moves(self):
        best_offense_move = None
        best_defense_move = None
        for move in self.moves:
            move = Move(
                row_idx=move["rowIdx"],
                tile_idx=move["tileIdx"],
                player_number=move["playerNumber"],
            )
            if move.player_number == self.player_making_move:

                best_offense_move = self.best_move(
                    move.row_idx, move.tile_idx, self.player_making_move
                )
            else:
                best_defense_move = self.best_move(
                    move.row_idx, move.tile_idx, move.player_number
                )
        if best_defense_move:
            return best_defense_move
        elif best_offense_move:
            return best_offense_move
        else:
            legal_moves: List[Move] = Board(size=self.board_size, moves=self.moves).get_legal_moves()
            random_legal_move = random.choice(legal_moves)
            
            return random_legal_move

    def best_move(self, row_idx, tile_idx, player_number):
        def checkHorizontal():
            left_idx = tile_idx
            right_idx = tile_idx
            best_move = Move(0, 0, player_number)
            while left_idx > 0 and self.board[row_idx][tile_idx - 1] == 0:
                if self.board[row_idx][tile_idx - 1] == 0:
                    best_move = Move(row_idx, tile_idx - 1, self.player_making_move)

                left_idx -= 1

            while right_idx < self.board_size - 1 and (
                self.board[row_idx][right_idx + 1] == 0
                or self.board[row_idx][right_idx + 1] == player_number
            ):
                if self.board[row_idx][right_idx + 1] == 0:
                    best_move = Move(row_idx, right_idx + 1, self.player_making_move)
                right_idx += 1

            is_win = right_idx - left_idx + 1 >= self.win_by

            if is_win:
                return best_move

            return None

        def checkVertical():

            top_idx = row_idx
            bottom_idx = row_idx
            best_move = Move(0, 0, player_number)
            while top_idx > 0 and (
                self.board[top_idx - 1][tile_idx] == 0
                or self.board[top_idx - 1][tile_idx] == player_number
            ):
                if self.board[top_idx - 1][tile_idx] == 0:
                    best_move = Move(top_idx - 1, tile_idx, self.player_making_move)
                top_idx -= 1

            while bottom_idx < self.board_size - 1 and (
                self.board[bottom_idx + 1][tile_idx] == 0
                or self.board[bottom_idx + 1][tile_idx] == player_number
            ):
                if self.board[bottom_idx + 1][tile_idx] == 0:
                    best_move = Move(bottom_idx + 1, tile_idx, self.player_making_move)
                bottom_idx += 1

            is_win = bottom_idx - top_idx + 1 >= self.win_by

            if is_win:
                return best_move

            return None

        # named after bottom are of move diagonol direction
        def checkDiagonalLeft():
            left = [row_idx, tile_idx]
            right = [row_idx, tile_idx]
            best_move = Move(0, 0, player_number)
            while (
                left[0] < self.board_size - 1
                and left[1] > 0
                and (
                    self.board[left[0] + 1][left[1] - 1] == 0
                    or self.board[left[0] + 1][left[1] - 1] == player_number
                )
            ):
                if self.board[left[0] + 1][left[1] - 1] == 0:
                    best_move = Move(left[0] + 1, left[1] - 1, self.player_making_move)
                left[0] += 1
                left[1] -= 1

            while (
                right[0] > 0
                and right[1] < self.board_size - 1
                and (
                    self.board[right[0] - 1][right[1] + 1] == 0
                    or self.board[right[0] - 1][right[1] + 1] == player_number
                )
            ):
                if self.board[right[0] - 1][right[1] + 1] == 0:
                    best_move = Move(
                        right[0] - 1, right[1] + 1, self.player_making_move
                    )

                right[0] -= 1
                right[1] += 1

            is_win = right[1] - left[1] + 1 >= self.win_by

            if is_win:
                return best_move

            return None

        # named after bottom are of move diagonol direction
        def checkDiagonalRight():
            left = [row_idx, tile_idx]
            right = [row_idx, tile_idx]
            best_move = Move(0, 0, player_number)
            while (
                right[0] < self.board_size - 1
                and right[1] < self.board_size - 1
                and (
                    self.board[right[0] + 1][right[1] + 1] == 0
                    or self.board[right[0] + 1][right[1] + 1] == player_number
                )
            ):
                if self.board[right[0] + 1][right[1] + 1] == 0:
                    best_move = Move(
                        right[0] + 1, right[1] + 1, self.player_making_move
                    )
                right[0] += 1
                right[1] += 1

            while (
                left[0] > 0
                and left[1] > 0
                and (
                    self.board[left[0] - 1][left[1] - 1] == 0
                    or self.board[left[0] - 1][left[1] - 1] == player_number
                )
            ):
                if self.board[left[0] - 1][left[1] - 1] == 0:
                    best_move = Move(left[0] - 1, left[1] - 1, self.player_making_move)

                left[0] -= 1
                left[1] -= 1

            is_win = right[1] - left[1] + 1 >= self.win_by

            if is_win:
                return best_move

            return None

        horizontal = checkHorizontal()
        vertical = checkVertical()
        diagonal_left = checkDiagonalLeft()
        diagonal_right = checkDiagonalRight()
        best_placement = None
        if horizontal:
            best_placement = horizontal
        if vertical:
            best_placement = vertical
        if diagonal_right:
            best_placement = diagonal_right
        if diagonal_left:
            best_placement = diagonal_left

        # self.make_move(best_placement)
        # print(best_placement)
        return best_placement


    def make_move(self, new_move: Move):
        row_idx = new_move.row_idx
        tile_idx = new_move.tile_idx
        player_number = new_move.player_number
        self.board[row_idx][tile_idx] = player_number
        print("NEW BOARD")
        for row in self.board:
            print(f"{row}\n")


if __name__ == "__main__":
    moves = [
        {"player_number": 1, "row_idx": 0, "tile_idx": 1},
        {"player_number": 1, "row_idx": 0, "tile_idx": 2},
        {"player_number": 1, "row_idx": 1, "tile_idx": 0},
        {"player_number": 1, "row_idx": 1, "tile_idx": 2},
        {"player_number": 1, "row_idx": 2, "tile_idx": 0},
        {"player_number": 1, "row_idx": 2, "tile_idx": 1},
        {"player_number": 2, "row_idx": 2, "tile_idx": 2},
    ]
    bot = Bot(win_by=3, board_size=3, moves=moves, player_making_move=2)
    
    print(bot.scan_moves())
