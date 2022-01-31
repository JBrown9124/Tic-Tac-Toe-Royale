import copy
from typing import *
from .BotModels.bot_board import Board
from .BotModels.choice import Choice
from .BotModels.move import Move
from .BotModels.best_move import BestMove
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
        #     board[move["row_idx"]][move["tile_idx"]] = move[" player_id"]

        for row in board:
            print(f"{row}\n")

        return board

    def scan_moves(self):
        best_offense_moves = []
        best_defense_moves = []
        highest_chance = 0
        defense = 0 if self.board_size == 3 else 1
        offense = 1 if self.board_size == 3 else 0
        best_move = None
        
        
        for move in self.moves:
            move = Move(
                row_idx=move["rowIdx"],
                tile_idx=move["tileIdx"],
                 player_id=move["playerId"],
            )
            if move.player_id == self.player_making_move:
                possible_best_move = self.best_move(
                    move.row_idx, move.tile_idx, self.player_making_move
                )
                if possible_best_move:
                    best_offense_moves.append(possible_best_move)
            elif move.player_id != self.player_making_move and move.player_id[:4] != "FIRE":
                possible_best_move = self.best_move(
                    move.row_idx, move.tile_idx, move.player_id
                )
                if possible_best_move:
                    best_defense_moves.append(possible_best_move)
        if len(best_defense_moves)>0:
            for move in best_defense_moves:
                # players_turn = self.player_making_move - move. player_id
                if move and (move.chance - defense)>= highest_chance:
                    best_move = Move(move.row_idx, move.tile_idx, self.player_making_move)
                    highest_chance = move.chance
                continue
                            
        if len(best_offense_moves)>0:
            for move in best_offense_moves:
                # players_turn = self.player_making_move - move. player_id
                if move and (move.chance - offense) >= highest_chance:
                    best_move = Move(move.row_idx, move.tile_idx, self.player_making_move)
                    highest_chance = move.chance
                continue
        
        
        
        if best_move is None:
            legal_moves: List[Move] = Board(
                size=self.board_size, moves=self.moves
            ).get_legal_moves()
            random_legal_move = random.choice(legal_moves)
            best_move = Move(random_legal_move.row_idx, random_legal_move.tile_idx, self.player_making_move)
            return best_move
        return best_move

    def best_move(self, row_idx, tile_idx,  player_id):
        def checkHorizontal():
            left_idx = tile_idx
            right_idx = tile_idx
            best_right_move = None
            best_left_move = None
            left_chance = 0
            right_chance = 0
            while left_idx > 0 and (
                self.board[row_idx][left_idx - 1] == 0
                or self.board[row_idx][left_idx - 1] ==  player_id
            ):
                

                if self.board[row_idx][left_idx  - 1] == 0 and not best_left_move:
                    best_left_move = BestMove(
                        row_idx, left_idx  - 1, left_chance, self.player_making_move
                    )
                if self.board[row_idx][left_idx  - 1] ==  player_id:
                    left_chance += 1
                    if best_left_move:
                        best_left_move.chance = left_chance
                left_idx -= 1

            while right_idx < self.board_size - 1 and (
                self.board[row_idx][right_idx + 1] == 0
                or self.board[row_idx][right_idx + 1] ==  player_id
            ):
                if self.board[row_idx][right_idx + 1] ==  player_id:
                    right_chance += 1
                    if best_right_move:
                        best_right_move.chance = right_chance
                if self.board[row_idx][right_idx + 1] == 0 and not best_right_move:
                    best_right_move = BestMove(
                        row_idx, right_idx + 1, right_chance, self.player_making_move
                    )
                right_idx += 1

           

           
            highest_chance = 0
            best_move = None
            if best_right_move and best_right_move.chance >=  highest_chance:
                best_move= best_right_move
                highest_chance = best_right_move.chance
            elif best_left_move and best_left_move.chance >=  highest_chance:
                best_move = best_left_move
                highest_chance = best_left_move.chance
            return best_move

            

        def checkVertical():

            top_idx = row_idx
            bottom_idx = row_idx
            best_top_move = None
            best_bottom_move = None
            top_chance = 0
            bottom_chance = 0
            while top_idx > 0 and (
                self.board[top_idx - 1][tile_idx] == 0
                or self.board[top_idx - 1][tile_idx] ==  player_id
            ):
                
                if self.board[top_idx - 1][tile_idx] == 0 and not best_top_move:
                    best_top_move = BestMove(
                        top_idx - 1, tile_idx, top_chance, self.player_making_move
                    )
                if self.board[top_idx - 1][tile_idx] ==  player_id:
                    top_chance += 1
                    if best_top_move:
                        best_top_move.chance = top_chance
                top_idx -= 1

            while bottom_idx < self.board_size - 1 and (
                self.board[bottom_idx + 1][tile_idx] == 0
                or self.board[bottom_idx + 1][tile_idx] ==  player_id
            ):
                
                if self.board[bottom_idx + 1][tile_idx] == 0 and not best_bottom_move:
                    best_bottom_move = BestMove(bottom_idx + 1, tile_idx, bottom_chance, self.player_making_move)
                if self.board[bottom_idx + 1][tile_idx] ==  player_id:
                    bottom_chance += 1
                    if best_bottom_move:
                        best_bottom_move.chance = bottom_chance
                bottom_idx += 1

          

          
            highest_chance = 0
            best_move = None
            if best_bottom_move and best_bottom_move.chance >=  highest_chance:
                best_move= best_bottom_move
                highest_chance = best_bottom_move.chance
            elif best_top_move and best_top_move.chance >= highest_chance:
                best_move = best_top_move
                highest_chance = best_top_move.chance
            return best_move

            

        # named after bottom are of move diagonol direction
        def checkDiagonalLeft():
            left = [row_idx, tile_idx]
            right = [row_idx, tile_idx]
            best_left_move = None
            best_right_move = None
            left_chance = 0
            right_chance = 0
            while (
                left[0] < self.board_size - 1
                and left[1] > 0
                and (
                    self.board[left[0] + 1][left[1] - 1] == 0
                    or self.board[left[0] + 1][left[1] - 1] ==  player_id
                )
            ):
                
                if self.board[left[0] + 1][left[1] - 1] == 0 and not best_left_move:
                    best_left_move = BestMove(left[0] + 1, left[1] - 1, left_chance, self.player_making_move)
                if self.board[left[0] + 1][left[1] - 1] ==  player_id:
                    left_chance += 1
                    if best_left_move:
                        best_left_move.chance = left_chance
                left[0] += 1
                left[1] -= 1

            while (
                right[0] > 0
                and right[1] < self.board_size - 1
                and (
                    self.board[right[0] - 1][right[1] + 1] == 0
                    or self.board[right[0] - 1][right[1] + 1] ==  player_id
                )
            ):
                
                if self.board[right[0] - 1][right[1] + 1] == 0 and not best_right_move:
                    best_right_move = BestMove(
                        right[0] - 1, right[1] + 1, right_chance, self.player_making_move
                    )
                if self.board[right[0] - 1][right[1] + 1] ==  player_id:
                    right_chance += 1
                    if best_right_move:
                        best_right_move.chance = right_chance

                right[0] -= 1
                right[1] += 1

            
            highest_chance = 0
            best_move = None
            if best_right_move and best_right_move.chance >=  highest_chance:
                best_move= best_right_move
                highest_chance = best_right_move.chance
            elif best_left_move and best_left_move.chance >=  highest_chance:
                best_move = best_left_move
                highest_chance = best_left_move.chance
            return best_move

            

        # named after bottom are of move diagonol direction
        def checkDiagonalRight():
            left = [row_idx, tile_idx]
            right = [row_idx, tile_idx]
            best_left_move = None
            best_right_move = None
            left_chance = 0
            right_chance = 0
            while (
                right[0] < self.board_size - 1
                and right[1] < self.board_size - 1
                and (
                    self.board[right[0] + 1][right[1] + 1] == 0
                    or self.board[right[0] + 1][right[1] + 1] ==  player_id
                )
            ):
                
                if self.board[right[0] + 1][right[1] + 1] == 0 and not best_right_move:
                    best_right_move = BestMove(
                        right[0] + 1, right[1] + 1, right_chance, self.player_making_move
                    )
                if self.board[right[0] + 1][right[1] + 1] ==  player_id:
                    right_chance += 1
                    if best_right_move:
                        best_right_move.chance = right_chance
                right[0] += 1
                right[1] += 1

            while (
                left[0] > 0
                and left[1] > 0
                and (
                    self.board[left[0] - 1][left[1] - 1] == 0
                    or self.board[left[0] - 1][left[1] - 1] ==  player_id
                )
            ):
                
                if self.board[left[0] - 1][left[1] - 1] == 0 and not best_left_move:
                    best_left_move = BestMove(left[0] - 1, left[1] - 1, left_chance, self.player_making_move)
                if self.board[left[0] - 1][left[1] - 1] ==  player_id:
                    left_chance += 1
                    if best_left_move:
                        best_left_move.chance = left_chance

                left[0] -= 1
                left[1] -= 1

            

            highest_chance = 0
            best_move = None
            if best_right_move and best_right_move.chance >=  highest_chance:
                best_move= best_right_move
                highest_chance = best_right_move.chance
            elif best_left_move and best_left_move.chance >=  highest_chance:
                best_move = best_left_move
                highest_chance = best_left_move.chance
            return best_move

        

        horizontal = checkHorizontal()
        vertical = checkVertical()
        diagonal_left = checkDiagonalLeft()
        diagonal_right = checkDiagonalRight()
        best_placement = None
        highest_chance = 0
        if horizontal and horizontal.chance >=  highest_chance:
            highest_chance = horizontal.chance
            best_placement = horizontal
        if vertical and vertical.chance >=  highest_chance:
            highest_chance = vertical.chance
            best_placement = vertical
        if diagonal_right and diagonal_right.chance >=  highest_chance:
            highest_chance = diagonal_right.chance
            best_placement = diagonal_right
        if diagonal_left and diagonal_left.chance >=  highest_chance:
            highest_chance = diagonal_left.chance
            best_placement = diagonal_left

        # self.make_move(best_placement)
        # print(best_placement)
        return best_placement

    def make_move(self, new_move: Move):
        row_idx = new_move.row_idx
        tile_idx = new_move.tile_idx
        player_id = new_move.player_id
        self.board[row_idx][tile_idx] =  player_id
        print("NEW BOARD")
        for row in self.board:
            print(f"{row}\n")


if __name__ == "__main__":
    moves = [
        {" player_id": 1, "row_idx": 0, "tile_idx": 1},
        {" player_id": 1, "row_idx": 0, "tile_idx": 2},
        {" player_id": 1, "row_idx": 1, "tile_idx": 0},
        {" player_id": 1, "row_idx": 1, "tile_idx": 2},
        {" player_id": 1, "row_idx": 2, "tile_idx": 0},
        {" player_id": 1, "row_idx": 2, "tile_idx": 1},
        {" player_id": 2, "row_idx": 2, "tile_idx": 2},
    ]
    bot = Bot(win_by=3, board_size=3, moves=moves, player_making_move=2)
    
    print(bot.scan_moves())
