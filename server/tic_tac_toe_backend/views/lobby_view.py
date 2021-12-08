from django.contrib.auth.middleware import get_user
from django.db.models import Max, Q
from django.db.models.query import Prefetch
from django.http import HttpResponse, JsonResponse, HttpResponseServerError
from random import randrange
from ..lobbys import lobbys
from rest_framework.views import APIView
from rest_framework.request import Request
from django.utils import timezone
from ..Models.lobby import LobbyModel
from ..ResponseModels.response_lobby import LobbyResponseModel
from ..Models.player import Player

# Create your views here.
class Lobby(APIView):
    def post(self, request: Request):
        """takes name of requester. creates lobby"""
        body = request.data
        player_name = body.get("playerName")
        player = Player(name=player_name, is_host=True).to_dict()
        lobby_id = randrange(999)
        lobby = LobbyModel(lobby_id=lobby_id)

        lobby.players.append(player)
        lobby_dict = lobby.to_dict()
        lobbys.update(lobby_dict)
        lobby_response = LobbyResponseModel(lobby=lobby_dict[lobby_id]).to_dict()
        lobby_response["lobbyId"] = lobby_id
        print(lobby)
        return JsonResponse({"lobby": lobby_response})

    def put(self, request: Request):
        """takes name of requester and lobbyId. find lobby, update lobby with new player,
        return new lobby state to client"""
        body = request.data
        player_name = body.get("playerName")
        lobby_id = body.get("lobbyId")

       
        try:
            lobby = lobbys[lobby_id]
        except:
            return HttpResponse("Lobby does not exist", status=404)
        player = Player(name=player_name, player_number=len(lobby["players"])).to_dict()
        lobby["players"].append(player)
        lobby_response = LobbyResponseModel(lobby=lobby).to_dict()
        lobby_response["lobbyId"] = lobby_id
        return JsonResponse({"lobby": lobby_response})

    def delete(self, request: Request):
        """takes name of requester and lobby Id. find lobby, remove player who left
        or if the host left remove all players from lobby."""
        body = request.data
        player_name = body.get("playerName")
        lobby_id = body.get("lobbyId")
        lobby_copy = lobbys[lobby_id]
        lobby_players_copy = lobby_copy["players"]
        for player in lobby_players_copy:
            if player["name"] == player_name:
                if player["isHost"]:
                    del lobbys[lobby_id]
                    return JsonResponse({"lobby": {}})
                else:
                    lobby_players_copy.remove(player)
                    lobbys[lobby_id]["players"] = lobby_players_copy
                    lobby_response = LobbyResponseModel(lobby=lobbys[lobby_id]).to_dict()
                    lobby_response["lobbyId"] = lobby_id
                    return JsonResponse({"lobby": lobby_response})
