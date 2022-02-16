from django.contrib.auth.middleware import get_user
from django.db.models import Max, Q
from django.db.models.query import Prefetch
from django.http import HttpResponse, JsonResponse
from random import randrange
from collections import deque
from rest_framework.views import APIView
from rest_framework.request import Request
from django.utils import timezone
from ..Models.lobby import LobbyModel
from ..ResponseModels.response_lobby import LobbyResponseModel
from ..Models.board import BoardModel
from ..Models.player import Player
from ..Models.win import Win
from ..ResponseModels.response_board import BoardResponseModel
from ..Models.new_move import Move
from ..Providers.FireProvider.fire import Fire
from ..Providers.FireProvider.FireModels.fire_move import FireMove
from django.core.cache import cache
from ..Providers.PowerUpProvider.add_fire import add_fire
from ..Providers.PowerUpProvider.destroy_move import destroy_move
from ..Providers.PowerUpProvider.spread_fire import spread_fire
import uuid

# Create your views here.
class Board(APIView):
    def put(self, request: Request):
        """takes new move coordinates,lobbyId, and gameStatus. updates lobby board, and returns 
        new move coordinates and update game status(whos move it is, who won)"""
        body = request.data
        game_status = body.get("gameStatus")
        new_move = game_status.get("newMove")
        new_power_up_use = game_status.get("newPowerUpUse")
        # fire_tiles = game_status.get("fireTiles")
        power_up = body.get("powerUp")

        win = game_status.get("win")
        if type(win) == list:
            win = win[0]
        winner = win.get("whoWon")
        winning_moves = win.get("winningMoves")
        win_type = win.get("type")

        lobby_id = body.get("lobbyId")

        lobby_copy = cache.get(lobby_id)

        lobby_players_copy = lobby_copy["players"]
        lobby_board_copy = lobby_copy["board"]
        lobby_game_status_copy = lobby_copy["gameStatus"]
        last_turn = lobby_game_status_copy["whoTurn"]

        # Validate that the person who is sending a move is supposed to move in the turn order rotation.
        if game_status["whoTurn"] != lobby_players_copy[-1]["playerId"]:
            return HttpResponse("Not your turn!", status=404)

        last_turn_player = lobby_players_copy.pop()

        # if player aquired a power up
        if power_up:
            last_turn_player["inventory"].append(power_up)

        # queue turn order rotation
        lobby_players_copy = deque(lobby_players_copy)
        lobby_players_copy.appendleft(last_turn_player)
        next_turn_player = lobby_players_copy[-1]["playerId"]

        # set next persons turn in rotation
        lobby_game_status_copy["whoTurn"] = next_turn_player

        if winner:
            win = Win(
                who_won=winner, type=win_type, winning_moves=winning_moves
            ).to_dict()
            lobby_game_status_copy["win"] = win

        is_move = len(new_power_up_use["selectedPowerUpTiles"]) == 0
        if is_move:
            lobby_board_copy["moves"].append(new_move)
        else:
            is_destroying_power = (
                new_power_up_use["powerUp"]["name"] == "arrow"
                or new_power_up_use["powerUp"]["name"] == "cleave"
                or new_power_up_use["powerUp"]["name"] == "bomb"
            )
            if is_destroying_power:
                destroy_move(new_power_up_use, lobby_board_copy, lobby_game_status_copy)

            is_new_fire_placement = new_power_up_use["powerUp"]["name"] == "fire"
            if is_new_fire_placement:
                add_fire(
                    new_power_up_use,
                    last_turn,
                    lobby_board_copy,
                    lobby_game_status_copy,
                )

        fire_tiles_exist = len(lobby_game_status_copy["fireTiles"]) > 0
        if fire_tiles_exist:
            spread_fire(lobby_game_status_copy, last_turn, lobby_board_copy)

        tile_amount = lobby_board_copy["size"] * lobby_board_copy["size"]
        no_open_tiles = len(lobby_board_copy["moves"]) == tile_amount
        if no_open_tiles and not winner:
            win = Win(who_won="tie", type="tie").to_dict()
            lobby_game_status_copy["win"] = win

        lobby_game_status_copy["newPowerUpUse"] = new_power_up_use
        lobby_game_status_copy["newMove"] = new_move
        lobby_copy["board"] = lobby_board_copy
        lobby_copy["gameStatus"] = lobby_game_status_copy
        lobby_copy["players"] = list(lobby_players_copy)
        cache.set(lobby_id, lobby_copy, 3600)

        return JsonResponse({"gameStatus": lobby_copy["gameStatus"]})
