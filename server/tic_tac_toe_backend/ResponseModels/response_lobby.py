from typing import *


class LobbyResponseModel(object):
    def __init__(self, lobby):
        self.lobby = lobby

    def to_dict(self):
        return {
            "board_color": self.lobby["board_color"],
            "board_size": self.lobby["board_size"],
            "players":self.lobby["players"]
        }
