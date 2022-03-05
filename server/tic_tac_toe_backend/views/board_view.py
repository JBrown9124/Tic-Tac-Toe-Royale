from django.http import HttpResponse, JsonResponse
from collections import deque
from rest_framework.views import APIView
from rest_framework.request import Request

from tic_tac_toe_backend.cache_models.view_models.turn import TurnModel
from ..cache_models.win import Win
from django.core.cache import cache
from ..Providers.PowerUpProvider.add_fire import add_fire
from ..Providers.PowerUpProvider.destroy_move import destroy_move
from ..Providers.PowerUpProvider.spread_fire import spread_fire


class Board(APIView):
    def put(self, request: Request):
        """takes new move coordinates,lobbyId, and gameStatus. updates lobby board, and returns
        new move coordinates and update game status(whos move it is, who won)"""
        body = request.data
        received_game_status = body.get("gameStatus")
        new_move = received_game_status.get("newMove")
        new_power_up_use = received_game_status.get("newPowerUpUse")
        added_power_up = body.get("powerUp")

        win = received_game_status.get("win")
        if type(win) == list:
            win = win[0]

        lobby_id = body.get("lobbyId")

        lobby = cache.get(lobby_id)

        turn_handler = TurnModel(lobby, new_power_up_use, new_move, win)
        turn_handler.validate(received_game_status)
        turn_handler.add_to_inv(added_power_up)
        turn_handler.rotate()
        turn_handler.handle_winner()
        turn_handler.make_move_or_use_power()
        turn_handler.handle_fire_spread()
        turn_handler.handle_tie()

        lobby["board"] = turn_handler.board
        lobby["gameStatus"] = turn_handler.game_status
        lobby["players"] = turn_handler.players
        
        cache.set(lobby_id, lobby, 3600)

        return JsonResponse({"gameStatus": lobby["gameStatus"]})
