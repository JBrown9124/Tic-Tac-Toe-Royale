from django.db import models
from django.db.models import Q

from . import utils
from .game_status import GameStatus


class Win(utils.CustomModel):

   game_status = models.ForeignKey(GameStatus, on_delete=models.CASCADE)
   type = models.CharField(max_length=60)
   who_won = models.CharField(max_length=60)
  
   
        