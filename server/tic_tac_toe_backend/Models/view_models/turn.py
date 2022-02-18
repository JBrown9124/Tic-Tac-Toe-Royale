from collections import deque
from django.http import HttpResponse
from tic_tac_toe_backend.Providers.PowerUpProvider.spread_fire import spread_fire
from tic_tac_toe_backend.Providers.PowerUpProvider.add_fire import add_fire
from tic_tac_toe_backend.Providers.PowerUpProvider.destroy_move import destroy_move

from tic_tac_toe_backend.Models.win import Win


class TurnModel:
    def __init__(self, lobby, new_power_up_use, new_move, win):
        
        self.game_status = lobby["gameStatus"]
        self.players = lobby["players"]
        self.board = lobby["board"]

        self.last_turn_player = self.game_status["whoTurn"]
        self.new_power_up_use = new_power_up_use
        self.new_move = new_move
        self.win = win

    def validate(self, received_game_status):
        if received_game_status["whoTurn"] != self.players[-1]["playerId"]:
            return HttpResponse("Not your turn!", status=404)

    def add_to_inv(self, power_up):
        if power_up:
            self.players[-1]["inventory"].append(power_up)

    def rotate(self):
        # queue turn order rotation
        rotated_player = self.players.pop()
        self.players = [rotated_player] + self.players

        next_turn_player_id = self.players[-1]["playerId"]
        # set next persons turn in rotation
        self.game_status["whoTurn"] = next_turn_player_id

    def handle_winner(self):
        winner = self.win.get("whoWon")
        winning_moves = self.win.get("winningMoves")
        win_type = self.win.get("type")
        if winner:
            win = Win(
                who_won=winner, type=win_type, winning_moves=winning_moves
            ).to_dict()
            self.game_status["win"] = win

    def is_move(self):
        return len(self.new_power_up_use["selectedPowerUpTiles"]) == 0

    def make_move(self):
        self.board["moves"].append(self.new_move)

    def use_power(self):
        is_arrow = self.new_power_up_use["powerUp"]["name"] == "arrow"
        is_cleave = self.new_power_up_use["powerUp"]["name"] == "cleave"
        is_bomb = self.new_power_up_use["powerUp"]["name"] == "bomb"
        is_destroying_power = is_arrow or is_cleave or is_bomb
        if is_destroying_power:
            destroy_move(self.new_power_up_use, self.board, self.game_status)

        is_new_fire_placement = self.new_power_up_use["powerUp"]["name"] == "fire"
        if is_new_fire_placement:
            add_fire(
                self.new_power_up_use,
                self.last_turn,
                self.board,
                self.game_status,
            )

    def make_move_or_use_power(self):
        if self.is_move():
            self.make_move()
        else:
            self.use_power()

    def handle_fire_spread(self):
        fire_tiles_exist = len(self.game_status["fireTiles"]) > 0
        if fire_tiles_exist:
            spread_fire(self.game_status, self.last_turn, self.board)

    def handle_tie(self):
        board_size = self.board["size"]
        tile_amount = board_size * board_size
        amount_of_moves_made = len(self.board["moves"])
        no_open_tiles = amount_of_moves_made == tile_amount
        winner = self.win.get("whoWon")
        if no_open_tiles and not winner:
            win = Win(who_won="tie", type="tie").to_dict()
            self.game_status["win"] = win
