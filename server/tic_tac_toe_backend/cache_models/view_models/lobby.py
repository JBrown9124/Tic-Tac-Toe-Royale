from typing import *
from random import randrange
from tic_tac_toe_backend.Providers.BotProvider.create_bot import create_bot
from random import randrange
from django.core.cache import cache
from tic_tac_toe_backend.cache_models.player import Player
from ..board import BoardModel
from ..game_status import GameStatus


class LobbyModel(object):
    def __init__(
        self,
        host_sid: int,
        lobby_id,
        board,
        game_status,
        players,
    ):
        self.lobby_id = lobby_id
        self.board = board
        self.players = players
        self.game_status = game_status
        self.host_sid = host_sid

    @classmethod
    def create(cls, host_sid):
        lobby_id = cls.create_id()
        return cls(
            host_sid, lobby_id, BoardModel().to_dict(), GameStatus().to_dict(), []
        )

    def create_id():
        lobby_id = randrange(99999)
        lobby_exists = cache.get(lobby_id)
        while lobby_exists:
            lobby_id = randrange(99999)
            lobby_exists = cache.get(lobby_id)
        return lobby_id

    def add_player(self, player_name, session_id):
        if player_name == "BOTPASSPASS":
            player = create_bot(self.players)
        else:
            player = Player(
                name=player_name,
                session_id=session_id,
            ).to_dict()
        self.players.append(player)
        return player

    def remove_player(self, player_id, session_id):
        make_new_host = False
        if player_id[:3] == "BOT":
            for index, player in enumerate(self.players):
                if player["playerId"] == player_id:
                    self.players.remove(player)
        else:
            for index, player in enumerate(self.players):
                if (
                    player["sessionId"] == session_id
                    and player["playerId"][:3] != "BOT"
                ):
                    if player["isHost"]:
                        make_new_host = True
                    self.players.remove(player)

        new_host = None
        if make_new_host and len(self.players) > 0:
            for index, player in enumerate(self.players):
                if player["playerId"][:3] != "BOT":
                    new_host = player
                    self.players[index]["isHost"] = True
                    new_host["piece"] = None
                    break
        return new_host

    def to_dict(self):
        return {
            self.lobby_id: {
                "board": self.board,
                "players": self.players,
                "gameStatus": self.game_status,
                "hostSid": self.host_sid,
            }
        }

    def __repr__(self):
        return f"{self.lobby_id}: board:{self.board} players:{self.players} gameStatus:{self.game_status}"
