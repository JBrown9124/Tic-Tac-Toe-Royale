from django.http import JsonResponse
from random import shuffle
from rest_framework.views import APIView
from rest_framework.request import Request

from tic_tac_toe_backend.Models.view_models.game import GameModel
from ..ResponseModels.response_lobby import LobbyResponseModel
from ..Models.board import BoardModel
from ..Models.game_status import GameStatus
from ..Models.win import Win
from django.core.cache import cache

# Create your views here.
class Game(APIView):
    def get(self, request: Request):
        """takes lobbyId. gets lobby, game status for guest users when game starts and handles getting game data for refresh of browser"""

        body = request.query_params
        lobby_id = int(body.get("lobbyId"))
        player_id = body.get("playerId")

        lobby = cache.get(lobby_id)
        try:
            lobby = lobby[lobby_id]
        except:
            lobby = lobby

        lobby_players = lobby["players"]

        for player in lobby_players:
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

        lobby = cache.get(lobby_id)
        try:
            lobby = lobby[lobby_id]
        except:
            lobby = lobby
        
        game = GameModel(lobby)
        game.start(
            board,
            host_piece,
            player_id,
        )

        cache.set(lobby_id, lobby, 3600)

        lobby_response = LobbyResponseModel(lobby=lobby, lobby_id=lobby_id).to_dict()

        return JsonResponse({"lobby": lobby_response})

    def put(self, request: Request):
        """takes guests and host player pieces when they hit ready button (guest) or select piece (host) and lobbyId, changes ready status to true"""

        body = request.data
        lobby_id = body.get("lobbyId")
        player = body.get("player")
        player_piece = player.get("piece")
        player_id = player.get("playerId")

        lobby = cache.get(lobby_id)
        try:
            lobby = lobby[lobby_id]
        except:
            lobby = lobby
        
        game = GameModel(lobby)
        game.update_player_ready_status(player_piece, player_id)
        
        cache.set(lobby_id, lobby, 3600)

        lobby_response = LobbyResponseModel(lobby=lobby, lobby_id=lobby_id).to_dict()

        return JsonResponse({"lobby": lobby_response})

    def delete(self, request: Request):
        pass
