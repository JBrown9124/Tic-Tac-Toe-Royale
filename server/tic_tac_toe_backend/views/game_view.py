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
from ..Models.board import BoardModel
from ..Models.game_status import GameStatus
from ..Models.win import Win

# Create your views here.
class Game(APIView):
    def get(self, request: Request):
        """takes lobbyId. gets lobby, game status for guest users when game starts and handles getting game data for refresh of browser"""
        test_request = request
        body = request.query_params
        lobby_id = int(body.get("lobbyId"))
        lobby = lobbys[lobby_id]
        lobby_response = LobbyResponseModel(lobby=lobby, lobby_id=lobby_id).to_dict()
        return JsonResponse({"lobby": lobby_response})

    def post(self, request: Request):
        """start game. takes board settings and lobbyId. updates lobby with new board settings. returns lobby with updated board settings."""
        body = request.data
        lobby_id = body.get("lobbyId")
        board = body.get("board")
        host_piece = body.get("piece")
        board_model = BoardModel(
            size=board["size"], color=board["color"], win_by=board["winBy"]
        ).to_dict()

        lobby_copy = lobbys[lobby_id]
        lobby_copy["board"] = board_model

        lobby_players_copy = lobby_copy["players"]
        game_status_model = GameStatus(players_amount=len(lobby_players_copy), win=Win().to_dict()).to_dict()
        lobby_copy["gameStatus"] = game_status_model
        for player in lobby_players_copy:
            if player["isHost"]:
                player["piece"] = host_piece
                player["isReady"] = True

                lobbys[lobby_id]["players"] = lobby_players_copy
                lobbys[lobby_id] = lobby_copy
                lobby_response = LobbyResponseModel(
                    lobby=lobby_copy, lobby_id=lobby_id
                ).to_dict()
                return JsonResponse({"lobby": lobby_response})

    def put(self, request: Request):
        """takes guests player settings when they hit ready button and lobbyId, changes ready status to true"""
        body = request.data
        lobby_id = body.get("lobbyId")
        player = body.get("player")
        player_name = player.get("name")
        player_piece = player.get("piece")
        lobby = lobbys[lobby_id]
        lobby_players_copy = lobby["players"]
        for player in lobby_players_copy:
            if player["name"] == player_name:
                player["piece"] = player_piece
                player["isReady"] = not player["isReady"]
                lobbys[lobby_id]["players"] = lobby_players_copy
                lobby_response = LobbyResponseModel(
                    lobby=lobbys[lobby_id], lobby_id=lobby_id
                ).to_dict()

                return JsonResponse({"lobby": lobby_response})

    def delete(self, request: Request):
        pass
