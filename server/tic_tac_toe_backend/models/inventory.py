from django.db import models
from django.db.models import Q

from . import utils
from .player import Player


class Inventory(utils.CustomModel):

   player = models.ForeignKey(Player, on_delete=models.CASCADE)
   
        