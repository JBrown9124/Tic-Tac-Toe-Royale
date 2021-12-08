from django.contrib.auth.middleware import get_user
from django.db.models import Max, Q
from django.db.models.query import Prefetch
from django.http import HttpResponse, JsonResponse
from random import randrange
from ..lobbys import lobbys
from rest_framework.views import APIView
from rest_framework.request import Request
from django.utils import timezone
from ..Models.lobby import LobbyModel
from ..ResponseModels.response_lobby import LobbyResponseModel
from ..Models.player import Player

# Create your views here.
class Game(APIView):
    def post(self, request: Request):
        """takes board settings. returns lobby with updated board settings."""
    def put(self, request: Request):
        """takes guests player settings when they hit ready button and lobbyId, changes ready status to true"""
        body = request.data
        lobby_id = body.get("lobbyId")
        player = body.get("player")
        player_name = player.get("name")
        player_piece = player.get("piece")
        lobby = lobbys[lobby_id]
        lobby_players_copy = lobby['players']
        for player in lobby_players_copy:
            if player["name"] == player_name:
                player["piece"] = player_piece
                player['isReady']=True
                lobbys[lobby_id]["players"] = lobby_players_copy
                lobby_response = LobbyResponseModel(lobby=lobbys[lobby_id]).to_dict()
                return JsonResponse({"lobby":lobby_response})
                
            

    def delete(self, request: Request):
        pass
