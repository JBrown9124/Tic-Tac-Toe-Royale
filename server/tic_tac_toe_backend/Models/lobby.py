from typing import *


class LobbyModel(object):
    def __init__(
        self,
        lobby_id: int,
        board_color: str = None,
        board_size: int = None,
    ):
        self.lobby_id = lobby_id
        self.board_color = board_color
        self.board_size = board_size
        self.players = []

    def to_dict(self):
        return {
            self.lobby_id: {
                "board_color": self.board_color,
                "board_size": self.board_size,
                "players": self.players,
            }
        }

    def __repr__(self):
        return f"{self.lobby_id}board_color: {self.board_color} board_size: {self.board_size}, players:{self.players}"
