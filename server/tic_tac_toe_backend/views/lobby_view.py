from django.contrib.auth.middleware import get_user
from django.db.models import Max, Q
from django.db.models.query import Prefetch
from django.http import HttpResponse, JsonResponse, HttpResponseServerError
from random import randrange

from rest_framework.views import APIView
from rest_framework.request import Request
from django.utils import timezone
from ..Models.lobby import LobbyModel
from ..ResponseModels.response_lobby import LobbyResponseModel
from ..Models.player import Player
from django.core.cache import cache
from ..Providers.BotProvider.bot_pieces import bot_pieces
from ..Providers.BotProvider.create_bot import create_bot

# Create your views here.
class Lobby(APIView):
    def post(self, request: Request):
        """creates looby. takes name of requester and sid of requester. creates lobby. returns lobby and playerId for requester"""
        body = request.data
        player_name = body.get("playerName")
        host_sid = body.get("hostSid")

        player = Player(name=player_name, is_host=True, session_id=host_sid).to_dict()

        lobby = LobbyModel.create(host_sid)
        lobby.players.append(player)

        lobby_id = lobby.lobby_id
        lobby = lobby.to_dict()

        cache.set(lobby_id, lobby[lobby_id], 3600)

        lobby_response = LobbyResponseModel(
            lobby=lobby[lobby_id], lobby_id=lobby_id
        ).to_dict()

        return JsonResponse({"lobby": lobby_response, "playerId": player["playerId"]})

    def put(self, request: Request):
        """takes name of requester and lobbyId. find lobby, update lobby with new player,
        return new lobby state and new player to clients. also creates bots"""
        body = request.data
        player_name = body.get("playerName")
        session_id = body.get("sessionId")
        lobby_id = int(body.get("lobbyId"))

        try:
            lobby = cache.get(lobby_id)

        except:
            return HttpResponse("Lobby does not exist", status=404)
        try:
            lobby = lobby[lobby_id]
        except:
            lobby = lobby

        lobby = LobbyModel(
            lobby_id=lobby_id,
            host_sid=lobby["hostSid"],
            players=lobby["players"],
            board=lobby["board"],
            game_status=lobby["gameStatus"],
        )

        new_player = lobby.add_player(player_name, session_id)

        lobby = lobby.to_dict()
        cache.set(lobby_id, lobby[lobby_id], 3600)
        lobby_response = LobbyResponseModel(
            lobby=lobby[lobby_id], lobby_id=lobby_id
        ).to_dict()

        return JsonResponse({"lobby": lobby_response, "player": new_player})

    def delete(self, request: Request):
        """takes name of requester and lobby Id. find lobby, remove player who left
        or if the host left remove all players from lobby."""
        body = request.data

        lobby_id = int(body.get("lobbyId"))
        player = body.get("player")
        player_id = player.get("playerId")
        session_id = player.get("sessionId")

        lobby = cache.get(lobby_id)
        try:
            lobby = lobby[lobby_id]
        except:
            lobby = lobby
        lobby = LobbyModel(
            lobby_id=lobby_id,
            host_sid=lobby["hostSid"],
            players=lobby["players"],
            board=lobby["board"],
            game_status=lobby["gameStatus"],
        )

        new_host = lobby.remove_player(player_id, session_id)

        lobby = lobby.to_dict()

        cache.set(lobby_id, lobby[lobby_id], 3600)

        lobby_response = LobbyResponseModel(
            lobby=lobby[lobby_id], lobby_id=lobby_id
        ).to_dict()

        return JsonResponse({"lobby": lobby_response, "newHost": new_host})
