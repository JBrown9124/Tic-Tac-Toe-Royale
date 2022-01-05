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
from django.core.cache import cache
from ..Providers.BotProvider.bot_pieces import bot_pieces

# Create your views here.
class Lobby(APIView):
    def post(self, request: Request):
        """creates looby. takes name of requester and sid of requester. creates lobby. returns lobby and playerId for requester"""
        body = request.data
        player_name = body.get("playerName")
        host_sid = body.get("hostSid")

        player = Player(name=player_name, is_host=True,  turn_number=1,).to_dict()
        lobby_id = randrange(99999)
        lobby = LobbyModel(lobby_id=lobby_id, host_sid=host_sid)

        lobby.players.append(player)
        lobby_dict = lobby.to_dict()
        cache.set(lobby_id, lobby_dict, 3600)

        lobby_response = LobbyResponseModel(
            lobby=lobby_dict[lobby_id], lobby_id=lobby_id
        ).to_dict()

        print(lobby)
        return JsonResponse({"lobby": lobby_response, "playerId":player["playerId"]})

    def put(self, request: Request):
        """takes name of requester and lobbyId. find lobby, update lobby with new player,
        return new lobby state to client. Also creates bots"""
        body = request.data
        player_name = body.get("playerName")
        lobby_id = int(body.get("lobbyId"))

        try:
            lobby = cache.get(lobby_id)

        except:
            return HttpResponse("Lobby does not exist", status=404)
        try:
            lobby = lobby[lobby_id]
        except:
            lobby = lobby
        turn_number = len(lobby["players"]) + 1
        if player_name == "BOTPASSPASS":

            lobby_bot_pieces = set()
            lobby_players = lobby["players"]
            for player in lobby_players:
                player_id = player["playerId"]
                if player_id[:3] == "BOT":
                    lobby_bot_pieces.add(player["piece"])
            bot_piece = None
            for piece in bot_pieces:
                if piece not in lobby_bot_pieces:
                    bot_piece = piece
                    break
            bot_name = "BOT" + str( turn_number)
            player = Player(
                name=bot_name,
                 turn_number= turn_number,
              is_loaded=True,
                piece=bot_piece,
                is_ready=True,
            ).to_dict()
            player["playerId"] = bot_name
            
        else:
            player = Player(
                name=player_name,
                 turn_number= turn_number,
                
            ).to_dict()
        lobby["players"].append(player)
        for index, player in enumerate(lobby["players"]):
            player["turnNumber"] = index + 1
        cache.set(lobby_id, lobby, 3600)
        lobby_response = LobbyResponseModel(lobby=lobby, lobby_id=lobby_id).to_dict()
        
        return JsonResponse({"lobby": lobby_response, "player":{"playerName":player["name"], "playerId":player["playerId"]}})

    def delete(self, request: Request):
        """takes name of requester and lobby Id. find lobby, remove player who left
        or if the host left remove all players from lobby."""
        body = request.data
       
        lobby_id = int(body.get("lobbyId"))
        player_id = body.get("playerId")
        lobby_copy = cache.get(lobby_id)
        try:
            lobby_copy = lobby_copy[lobby_id]
        except:
            lobby_copy = lobby_copy
        lobby_players_copy = lobby_copy["players"]
        for index, player in enumerate(lobby_players_copy):
            if player["playerId"] == player_id:
                if player["isHost"]:

                    cache.delete(lobby_id)
                    return JsonResponse({"lobby": {}})
                else:
                    lobby_players_copy.remove(player)
                    player["turnNumber"] = index + 1
                    lobby_copy["players"] = lobby_players_copy
                    
                   
                    cache.set(lobby_id, lobby_copy, 3600)
                    lobby_response = LobbyResponseModel(
                        lobby=lobby_copy, lobby_id=lobby_id
                    ).to_dict()
        
                    return JsonResponse({"lobby": lobby_response})
