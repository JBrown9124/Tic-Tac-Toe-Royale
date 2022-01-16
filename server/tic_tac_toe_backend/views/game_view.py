from django.contrib.auth.middleware import get_user
from django.db.models import Max, Q
from django.db.models.query import Prefetch
from django.http import HttpResponse, JsonResponse
from random import randrange
from random import shuffle
from rest_framework.views import APIView
from rest_framework.request import Request
from django.utils import timezone
from ..Models.lobby import LobbyModel
from ..ResponseModels.response_lobby import LobbyResponseModel
from ..Models.player import Player
from ..Models.board import BoardModel
from ..Models.game_status import GameStatus
from ..Models.win import Win
from django.core.cache import cache

# Create your views here.
class Game(APIView):
    def get(self, request: Request):
        """takes lobbyId. gets lobby, game status for guest users when game starts and handles getting game data for refresh of browser"""
        test_request = request
        body = request.query_params
        lobby_id = int(body.get("lobbyId"))
        player_id = body.get("playerId")
        lobby = cache.get(lobby_id)
        try:
            lobby = lobby[lobby_id]
        except:
            lobby = lobby
        lobby_players_copy = lobby["players"]
        for player in lobby_players_copy:
            if player["playerId"] == player_id:
                player["isLoaded"] = True
        lobby_response = LobbyResponseModel(lobby=lobby, lobby_id=lobby_id).to_dict()
        return JsonResponse({"lobby": lobby_response})

    def post(self, request: Request):
        """start game and play again. takes board settings and lobbyId. updates lobby with new board settings. returns lobby with updated board settings."""
        body = request.data
        lobby_id = body.get("lobbyId")
        board = body.get("board")
        host_piece = body.get("piece")
        player_id = body.get("playerId")
        board_model = BoardModel(
            size=board["size"], color=board["color"], win_by=board["winBy"]
        ).to_dict()

        lobby_copy = cache.get(lobby_id)
        try:
            lobby_copy = lobby_copy[lobby_id]
        except:
            lobby_copy = lobby_copy
        lobby_players_copy = lobby_copy["players"]
        # Dont shuffle moves exist in the previos board state. This signifies that user hits playing again button
        if len(lobby_copy["board"]["moves"]) == 0:
        
            shuffle(lobby_players_copy)
        lobby_copy["board"] = board_model

       
        game_status_model = GameStatus(
            who_turn=lobby_players_copy[-1]["playerId"], win=Win().to_dict()
        ).to_dict()
        lobby_copy["gameStatus"] = game_status_model
        for player in lobby_players_copy:
            if player["playerId"] == player_id:
                player["isHost"] = True
                player["piece"] = host_piece
                player["isReady"] = not player["isReady"]
            lobby_copy["players"] = lobby_players_copy
            cache.set(lobby_id, lobby_copy, 3600)
            lobby_response = LobbyResponseModel(
                lobby=lobby_copy, lobby_id=lobby_id
            ).to_dict()
            return JsonResponse({"lobby": lobby_response})

    def put(self, request: Request):
        """takes guests and host player pieces when they hit ready button (guest) or select piece (host) and lobbyId, changes ready status to true"""
        body = request.data
        lobby_id = body.get("lobbyId")
        player = body.get("player")
        player_name = player.get("name")
        player_piece = player.get("piece")
        player_id = player.get("playerId")
        lobby = cache.get(lobby_id)
        try:
            lobby = lobby[lobby_id]
        except:
            lobby = lobby
        lobby_players_copy = lobby["players"]
        for player in lobby_players_copy:
            if player["playerId"] == player_id:
                player["piece"] = player_piece
                player["isReady"] = not player["isReady"]
                lobby["players"] = lobby_players_copy
                cache.set(lobby_id, lobby, 3600)
                lobby_response = LobbyResponseModel(
                    lobby=lobby, lobby_id=lobby_id
                ).to_dict()

                return JsonResponse({"lobby": lobby_response})

    def delete(self, request: Request):
        pass
