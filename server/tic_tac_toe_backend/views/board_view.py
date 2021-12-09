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

# Create your views here.
class Board(APIView):
    def post(self, request: Request):
        pass
        
    def put(self, request: Request):
       """takes new move coordinates and lobbyId. updates lobby board, and returns new move coordinates"""
       body = request.data
       new_move = body.get('newMove')    
       lobby_id = body.get('lobbyId')
       lobby_copy = lobbys[lobby_id] 
       lobby_board_copy = lobby_copy["board"]
       lobby_board_copy["moves"].append(new_move)
       lobbys[lobby_id]["board"]=lobby_board_copy
       return JsonResponse({"newMove": new_move})
            

    def delete(self, request: Request):
        pass
