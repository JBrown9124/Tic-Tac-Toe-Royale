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
from ..Models.board import BoardModel
from ..Models.player import Player
from ..Models.win import Win
from ..ResponseModels.response_board import BoardResponseModel
from django.core.cache import cache
from Providers.bot import Bot

# Create your views here.
class Board(APIView):
    def post(self, request: Request):
        pass

    def put(self, request: Request):
        """takes new move coordinates,lobbyId, playerNumber, and gameStatus. updates lobby board, and returns new move coordinates and update game status(whos move it is, who won)"""
        body = request.data
        new_move = body.get("newMove")
        win = new_move.get("win")
        win_player_number = win.get("whoWon")
        winning_moves = win.get("winningMoves")
        win_type = win.get("type")
        last_turn = new_move.get("playerNumber")
        lobby_id = body.get("lobbyId")

        lobby_copy = cache.get(lobby_id)

        lobby_players_copy = lobby_copy["players"]
        if not new_move:
            bots_turn = Bot(board_size=lobby_copy["board"]["size"], moves=lobby_copy["board"]["moves"], players=lobby_players_copy, winBy=lobby_copy["board"]["winBy"])
        next_turn = 1 if last_turn == len(lobby_players_copy) else last_turn + 1

        lobby_game_status_copy = lobby_copy["gameStatus"]
        lobby_game_status_copy["whoTurn"] = next_turn
        
        if win_player_number:
            win = Win(
                who_won=last_turn, type=win_type, winning_moves=winning_moves
            ).to_dict()
            lobby_game_status_copy["win"] = win

        lobby_board_copy = lobby_copy["board"]
        lobby_board_copy["moves"].append(new_move)
        tile_amount = lobby_board_copy["size"] * lobby_board_copy["size"]
        
        if len(lobby_board_copy["moves"]) == tile_amount and not win_player_number:
            win = Win(who_won="tie", type="tie").to_dict()
            lobby_game_status_copy["win"] = win
        
        lobby_copy["board"] = lobby_board_copy
        lobby_copy["gameStatus"] = lobby_game_status_copy
        cache.set(lobby_id, lobby_copy, 3600)

        board_response = BoardResponseModel(
            new_move=new_move, game_status=lobby_game_status_copy
        ).to_dict()
        return JsonResponse(board_response)

    def delete(self, request: Request):
        pass
