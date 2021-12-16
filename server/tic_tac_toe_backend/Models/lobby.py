from typing import *
from random import randrange

class LobbyModel(object):
    def __init__(self, lobby_id: int,host_sid:int, board: dict = {}, game_status={}, ):
        self.lobby_id = lobby_id
        self.board = board
        self.players = []
        self.game_status = game_status
        self.host_sid = host_sid

    def to_dict(self):
        return {
            self.lobby_id: {
                "board": self.board,
                "players": self.players,
                "gameStatus":self.game_status,
                "hostSid":self.host_sid
                
            }
        }

    def __repr__(self):
        return f"{self.lobby_id}: board:{self.board} players:{self.players} gameStatus:{self.game_status}"
