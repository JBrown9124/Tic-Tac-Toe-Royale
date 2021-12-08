from typing import *


class LobbyResponseModel(object):
    def __init__(self, lobby):
        self.lobby = lobby

    def to_dict(self):
        return {
           
            "board": self.lobby["board"],
            "players":self.lobby["players"]
        }
