from django.db import models
from django.db.models import Q

from . import utils
from .player import Player


class PowerUp(utils.CustomModel):

   player_id = models.ForeignKey(Player, on_delete=models.CASCADE)
   
        