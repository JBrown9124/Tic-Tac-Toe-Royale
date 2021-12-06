from typing import *


class LobbyResponseModel(object):
    def __init__(self, lobby):
        self.lobby = lobby

    def __dict__(self):
        return {
            "board_color": self.lobby["board_color"],
            "board_size": self.lobby["board_size"],
            "player1": self.lobby["player1"],
            "player2_piece": self.lobby["player2"],
        }
