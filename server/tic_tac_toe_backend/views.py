from django.contrib.auth.middleware import get_user
from django.db.models import Max, Q
from django.db.models.query import Prefetch
from django.http import HttpResponse, JsonResponse
from random import randrange
from .lobbys import lobbys
from rest_framework.views import APIView
from rest_framework.request import Request
from django.utils import timezone
from .Models.lobby import LobbyModel
from .ResponseModels.response_lobby import LobbyResponseModel
from .Models.player import Player

# Create your views here.
class Lobby(APIView):
    def post(self, request: Request):
        """takes name of requester. creates lobby"""
        body = request.data
        player_name = body.get("name")
        player1 = Player(name=player_name).to_dict()
        lobby_id = randrange(10)
        lobby = LobbyModel(lobby_id=lobby_id)
       
        lobby.players.append(player1)
        lobby_dict = lobby.to_dict()
        lobbys.update(lobby_dict)
        print(lobbys)
        return JsonResponse({"lobby_id": lobby_id})

    def put(self, request: Request):
        """takes name of requester and lobbyId. find lobby, update lobby with new player,
        return new lobby state to client"""
        body = request.data
        player2_name = body.get("name")
        player2 = Player(name=player2_name)
        lobby_id = body.get("lobbyId")
        lobby = lobbys[lobby_id]
        lobby["players"].append(player2)
        lobby_response = LobbyResponseModel(lobby=lobby)
        return JsonResponse({"lobby": lobby_response})
