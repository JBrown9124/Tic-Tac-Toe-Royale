from django.contrib.auth.middleware import get_user
from django.db.models import Max, Q
from django.db.models.query import Prefetch
from django.http import HttpResponse, JsonResponse, HttpResponseServerError
from random import randrange

from rest_framework.views import APIView
from rest_framework.request import Request
from django.utils import timezone

from django.views.decorators.cache import never_cache
from django.views.generic import TemplateView
index = never_cache(TemplateView.as_view(template_name='index.html'))
# # Create your views here.
# class Lobby(APIView):
#     def post(self, request: Request):
#         """takes name of requester. creates lobby"""
#         body = request.data
#         player_name = body.get("playerName")
#         player = Player(name=player_name, is_host=True).to_dict()
#         lobby_id = randrange(999)
#         lobby = LobbyModel(lobby_id=lobby_id)

#         lobby.players.append(player)
#         lobby_dict = lobby.to_dict()
#         lobbys.update(lobby_dict)
#         lobby_response = LobbyResponseModel(lobby=lobby_dict[lobby_id]).to_dict()
#         lobby_response["lobbyId"] = lobby_id
#         print(lobby)
#         return JsonResponse({"lobby": lobby_response})

#     def put(self, request: Request):
#         """takes name of requester and lobbyId. find lobby, update lobby with new player,
#         return new lobby state to client"""
#         body = request.data
#         player_name = body.get("playerName")
#         lobby_id = body.get("lobbyId")

#         lobby = lobbys
#         lobby = lobbys[lobby_id]
#         player = Player(name=player_name, turnNumber=len(lobby["players"])).to_dict()
#         lobby["players"].append(player)
#         lobby_response = LobbyResponseModel(lobby=lobby).to_dict()
#         lobby_response["lobbyId"] = lobby_id
#         return JsonResponse({"lobby": lobby_response})

#     def delete(self, request: Request):
#         """takes name of requester and lobby Id. find lobby, remove player who left
#         or if the host left remove all players from lobby."""
#         body = request.data
#         player_name = body.get("playerName")
#         lobby_id = body.get("lobbyId")
#         lobby = lobbys[lobby_id]
#         lobby_players = lobby["players"]
#         for player in lobby_players:
#             if player["name"] == player_name:
#                 if player["isHost"]:
#                     del lobby
#                     return JsonResponse({"lobby": {}})
#                 else:
#                     del player
#                     lobby_response = LobbyResponseModel(lobby=lobby).to_dict()
#                     lobby_response["lobbyId"] = lobby_id
#                     return JsonResponse({"lobby": lobby_response})
