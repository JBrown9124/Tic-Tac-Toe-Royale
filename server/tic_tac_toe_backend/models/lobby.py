from django.db import models
from django.db.models import Q

from . import utils


class Lobby(utils.CustomModel):

    id = models.IntegerField(primary_key=True)
    joinable = models.BooleanField(default=True)

    