from django.db import models
from django.db.models import Q

from . import utils
from .board import Board
from .player import Player


class Moves(utils.CustomModel):

   board = models.ForeignKey(Board, on_delete=models.CASCADE)
   player_id = models.CharField(max_length=60)
   row_idx = models.IntegerField(null=False)
   column_idx = models.IntegerField(null=False)
   is_fire = models.BooleanField(default=False)
 
   
        