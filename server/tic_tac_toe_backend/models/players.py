from django.db import models
from django.db.models import Q

from . import utils
from .lobby import Lobby


class Players(utils.CustomModel):

   lobby_id = models.ForeignKey(Lobby, on_delete=models.CASCADE)

        