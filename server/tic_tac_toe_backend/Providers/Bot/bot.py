import copy
from typing import *
from BotModels.bot_board import Board
from BotModels.choice import Choice
from BotModels.move import Move
from BotModels.new_move import NewMove
from BotModels.placement import Placement


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
                and (self.board[row_idx][right_idx + 1] == 0 or self.board[row_idx][right_idx + 1] == self.player_making_move)
            ):
                right_idx += 1

            is_win = right_idx - left_idx + 1 >= self.win_by 
            
            if is_win:
                placement = (
                    Placement("right", left_idx, "horizontal")
                    if left_idx > right_idx
                    else Placement("left", right_idx, "horizontal")
                )
                return placement

            return Placement("down", 0)

        def checkVertical():

            top_idx = row_idx
            bottom_idx = row_idx

            while top_idx > 0 and (self.board[top_idx - 1][tile_idx] == 0 or self.board[top_idx - 1][tile_idx] == self.player_making_move):
                top_idx -= 1

            while (
                bottom_idx < self.board_size - 1
                and (self.board[bottom_idx + 1][tile_idx] == 0 or self.board[bottom_idx + 1][tile_idx] == self.player_making_move)
            ):
                bottom_idx += 1

            is_win = bottom_idx - top_idx + 1 >= self.win_by 
            
            if is_win:
                placement = (
                    Placement("up", top_idx, "vertical")
                    if top_idx > bottom_idx
                    else Placement("down", bottom_idx, "vertical")
                )
                return placement

            return Placement("down", 0)

        # named after bottom are of move diagonol direction
        def checkDiagonalLeft():
            left = [row_idx, tile_idx]
            right = [row_idx, tile_idx]
            while (
                left[0] < self.board_size - 1
                and left[1] > 0
                and (self.board[left[0] + 1][left[1] - 1] == 0 or self.board[left[0] + 1][left[1] - 1] == self.player_making_move)
            ):

                left[0] += 1
                left[1] -= 1

            while (
                right[0] > 0
                and right[1] < self.board_size - 1
                and (self.board[right[0] - 1][right[1] + 1] == 0 or self.board[right[0] - 1][right[1] + 1] ==self.player_making_move)
            ):

                right[0] -= 1
                right[1] += 1

            is_win = right[1] - left[1] + 1 >= self.win_by 
        
            if is_win:
                let j = left[0];
                for (let i = left[1]; i <= right[1]; i++) 
                    winningMoves.push({ rowIdx: j, tileIdx: i });
                    j -= 1;
      

            return Placement("down", 0)

        # named after bottom are of move diagonol direction
        def checkDiagonalRight():
            left = [row_idx, tile_idx]
            right = [row_idx, tile_idx]
            while (
                right[0] < self.board_size - 1
                and right[1] < self.board_size - 1
                and (self.board[right[0] + 1][right[1] + 1] == 0 or self.board[right[0] + 1][right[1] + 1] == self.player_making_move)
            ):
                
                right[0] += 1
                right[1] += 1

            while (
                left[0] > 0
                and left[1] > 0
                and (self.board[left[0] - 1][left[1] - 1] == 0 or self.board[left[0] - 1][left[1] - 1] == self.player_making_move)
            ):

                left[0] -= 1
                left[1] -= 1

            is_win = right[1] - left[1] + 1 >= self.win_by 
        
            if is_win:
                j = left[0];
                for i in range(left[1], right[1]) :
                    if self.board[j][i] == 0:
                        return Move(j,i,self.player_making_move)
                    j += 1;
      
               
            return None

        move = Move(row_idx=row_idx, tile_idx=tile_idx, player_number=player_number)
        horizontal = checkHorizontal()
        vertical = checkVertical()
        diagonal_left = checkDiagonalLeft()
        diagonal_right = checkDiagonalRight()
        best_placement = Placement("down", 0)
        if horizontal:
            best_placement = horizontal
        if vertical:
            best_placement = vertical
        if diagonal_right:
            best_placement = diagonal_right
        if diagonal_left:
            best_placement = diagonal_left
        new_move = NewMove(best_placement, move)
        self.make_move(new_move)
        print(new_move)
        return new_move

    def make_move(self, new_move: NewMove):
        row_idx = new_move.from_move.row_idx
        tile_idx = new_move.from_move.tile_idx
        direction = new_move.coordinates.direction_type
        move_amount = new_move.coordinates.move_amount
        move_direction = new_move.coordinates.move_direction
        if direction == "horizontal":
            if move_direction == "left":
                self.board[row_idx][tile_idx - move_amount] = self.player_making_move
            elif move_direction == "right":
                self.board[row_idx][tile_idx + move_amount] = self.player_making_move
        elif direction == "vertical":
            if move_direction == "up":
                self.board[row_idx - move_amount][tile_idx] = self.player_making_move
            elif move_direction == "down":
                self.board[row_idx + move_amount][tile_idx] = self.player_making_move
        elif direction == "diagonal_right":
            if move_direction == "left":
                self.board[row_idx-move_amount][tile_idx-move_amount] = self.player_making_move
            elif move_direction == "right":
                self.board[row_idx+move_amount][tile_idx+move_amount] = self.player_making_move
        elif direction == "diagonal_left":
            if move_direction == "left":
                self.board[row_idx+move_amount][tile_idx-move_amount] = self.player_making_move
            elif move_direction == "right":
                self.board[row_idx-move_amount][tile_idx+move_amount] = self.player_making_move
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
        {"player_number": 2, "row_idx": 0, "tile_idx": 0},
        
    ]
    bot = Bot(win_by=3, board_size=3, moves=moves)

    bot.board_size = 3
    bot.win_by = 3
    bot.player_making_move = 2
    bot.evaluate_board()
    bot.find_move()
