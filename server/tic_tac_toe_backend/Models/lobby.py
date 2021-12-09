from typing import *


class LobbyModel(object):
    def __init__(self, lobby_id: int, board: dict = {}):
        self.lobby_id = lobby_id
        self.board = board
        self.players = []

    def to_dict(self):
        return {
            self.lobby_id: {
                "board": self.board,
                "players": self.players,
                
            }
        }

    def __repr__(self):
        return f"{self.lobby_id}: board:{self.board} players:{self.players}"
