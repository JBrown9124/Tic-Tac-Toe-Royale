from django.db import models
from django.db.models import Q

from . import utils
from .lobby import Lobby


class Board(utils.CustomModel):

   lobby_id = models.ForeignKey(Lobby, on_delete=models.CASCADE)
   win_by = models.IntegerField(null=True)
   size = models.IntegerField(null=True)
   
        