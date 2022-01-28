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
from django.core.cache import cache


# Create your views here.
class Board(APIView):
    def post(self, request: Request):
        pass

    def put(self, request: Request):
        """takes new move coordinates,lobbyId, and gameStatus. updates lobby board, and returns new move coordinates and update game status(whos move it is, who won)"""
        body = request.data
        game_status = body.get("gameStatus")
        new_move = game_status.get("newMove")
        new_power_up_use = game_status.get("newPowerUpUse")
        
        power_up = body.get("powerUp")

        win = game_status.get("win")
        if type(win) == list:
            win=win[0]
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
            return HttpResponse("Not this player's turn")

        # Queue turn order rotation
        last_turn_player = lobby_players_copy.pop()
        if power_up:
            last_turn_player["inventory"].append(power_up)

        lobby_players_copy = deque(lobby_players_copy)
        lobby_players_copy.appendleft(last_turn_player)
        next_turn_player = lobby_players_copy[-1]["playerId"]

        lobby_game_status_copy["whoTurn"] = next_turn_player

        if winner:
            win = Win(
                who_won=last_turn, type=win_type, winning_moves=winning_moves
            ).to_dict()
            lobby_game_status_copy["win"] = win

        if len(new_power_up_use["selectedPowerUpTiles"])==0:
            lobby_board_copy["moves"].append(new_move)
        else:
            
            if (
                new_power_up_use["powerUp"]["name"] == "arrow"
                or new_power_up_use["powerUp"]["name"] == "cleave" or new_power_up_use["powerUp"]["name"] == "bomb"
            ):
                for affected_tile in new_power_up_use["selectedPowerUpTiles"]:
                    for move in lobby_board_copy["moves"]:
                    
                        if (
                            move["rowIdx"] == affected_tile["rowIdx"]
                            and move["tileIdx"] == affected_tile["tileIdx"]
                        ):
                            lobby_board_copy["moves"].remove(move)
            if new_power_up_use["powerUp"]["name"] == "swap":
                swapped_moves = set()
                for affected_tile in new_power_up_use["selectedPowerUpTiles"]:
                    for move in lobby_board_copy["moves"]:
                       
                        if (
                            move["rowIdx"] == affected_tile["rowIdx"]
                            and move["tileIdx"] == affected_tile["tileIdx"]
                            and move["playerId"] != affected_tile["playerId"] and affected_tile["playerId"] not in swapped_moves
                        ):  
                            
                            move["playerId"] = affected_tile["playerId"]
                            swapped_moves.add(move["playerId"])
                            break

        tile_amount = lobby_board_copy["size"] * lobby_board_copy["size"]

        if len(lobby_board_copy["moves"]) == tile_amount and not winner:
            win = Win(who_won="tie", type="tie").to_dict()
            lobby_game_status_copy["win"] = win
        
        lobby_game_status_copy["newPowerUpUse"] = new_power_up_use
        lobby_game_status_copy["newMove"] = new_move
        lobby_copy["board"] = lobby_board_copy
        lobby_copy["gameStatus"] = lobby_game_status_copy
        lobby_copy["players"] = list(lobby_players_copy)
        cache.set(lobby_id, lobby_copy, 3600)

        return JsonResponse({"gameStatus": lobby_copy["gameStatus"]})

    def delete(self, request: Request):
        pass
