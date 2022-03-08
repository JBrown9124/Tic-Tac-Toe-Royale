from typing import *


class LobbyResponseModel(object):
    def __init__(self, lobby, lobby_id):
        self.lobby = lobby
        self.lobby_id = lobby_id

    def to_dict(self):
        return {
            "board": self.lobby["board"],
            "players": self.lobby["players"],
            "joinable": self.lobby["joinable"],
            "lobbyId": self.lobby_id,
            "hostSid": self.lobby["hostSid"],
            "gameStatus": self.lobby["gameStatus"],
        }
