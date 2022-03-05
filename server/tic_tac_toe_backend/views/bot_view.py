from django.contrib.auth.middleware import get_user
from django.db.models import Max, Q
from django.db.models.query import Prefetch
from django.http import HttpResponse, JsonResponse
from random import randrange

from rest_framework.views import APIView
from rest_framework.request import Request
from django.utils import timezone
from ..cache_models.view_models.lobby import LobbyModel
from ..ResponseModels.response_lobby import LobbyResponseModel
from ..cache_models.board import BoardModel
from ..cache_models.player import Player
from ..cache_models.win import Win
from ..ResponseModels.response_board import BoardResponseModel
from django.core.cache import cache
from ..Providers.BotProvider.bot import Bot


class BotAction(APIView):
    def post(self, request: Request):
        """takes bots playerId and creates a move for it"""
        body = request.data
        playerId = body.get("playerId")

        
        lobby_id = body.get("lobbyId")

        lobby_copy = cache.get(lobby_id)

        lobby_board_copy = lobby_copy["board"]

        if playerId[:3] == "BOT":
            bot_move = Bot(board_size=lobby_board_copy["size"],moves=lobby_board_copy["moves"],win_by=lobby_board_copy["winBy"],player_making_move=playerId).scan_moves()
            return JsonResponse(bot_move.to_dict())

    def delete(self, request: Request):
        pass
