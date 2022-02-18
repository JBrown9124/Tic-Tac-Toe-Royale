from random import shuffle
from tic_tac_toe_backend.Models.game_status import GameStatus
from tic_tac_toe_backend.Models.win import Win
from tic_tac_toe_backend.Models.board import BoardModel


class GameModel:
    def __init__(
        self,
        lobby,
    ):
        self.lobby = lobby

        self.lobby_players = lobby["players"]

    def start(self, board, player_piece, player_id):
        board_model = BoardModel(
            size=board["size"], color=board["color"], win_by=board["winBy"]
        ).to_dict()

        cached_board_moves = self.lobby["board"]["moves"]

        # dont shuffle if moves exist in the previous board state. This signifies that user hits playing again button
        if len(cached_board_moves) == 0:

            shuffle(self.lobby_players)

        self.lobby["board"] = board_model

        game_status_model = GameStatus(
            who_turn=self.lobby_players[-1]["playerId"], win=Win().to_dict()
        ).to_dict()
        self.lobby["gameStatus"] = game_status_model

        for player in self.lobby_players:
            if player["playerId"] == player_id:
                player["isHost"] = True
                player["piece"] = player_piece
                player["isReady"] = not player["isReady"]
                break

    def update_player_ready_status(self, player_piece, player_id):
        for player in self.lobby_players:
            if player["playerId"] == player_id:
                player["piece"] = player_piece
                player["isReady"] = not player["isReady"]
                break
