from django.db import models
from django.db.models import Q

from . import utils
from .lobby import Lobby
from .player import Player


class GameStatus(utils.CustomModel):

   lobby = models.ForeignKey(Lobby, on_delete=models.CASCADE)
   who_turn = models.CharField(max_length=60)
   new_power_up_id = models.IntegerField(null=True)
   
        