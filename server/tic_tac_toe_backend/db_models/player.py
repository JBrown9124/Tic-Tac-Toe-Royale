from django.db import models
from django.db.models import Q

from . import utils
from .players import Players


class Player(utils.CustomModel):

   players_id = models.ForeignKey(Players, on_delete=models.CASCADE)
   name = models.CharField(max_length=200, null=False)
   piece = models.CharField(max_length=200)
   is_host = models.BooleanField(default=False)
   is_loaded = models.BooleanField(default=False)
   is_ready = models.BooleanField(default=False)
        