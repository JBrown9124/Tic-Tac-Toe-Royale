from django.db import models
from django.db.models import Q

from . import utils
from .game_status import GameStatus


class NewMove(utils.CustomModel):

   game_status_id = models.ForeignKey(GameStatus, on_delete=models.CASCADE)
   player_id = models.CharField(max_length=60)
   row_idx = models.IntegerField(null=False)
   column_idx = models.IntegerField(null=False)
   
  
   
        