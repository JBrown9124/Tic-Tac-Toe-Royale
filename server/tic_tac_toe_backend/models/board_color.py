from django.db import models
from django.db.models import Q

from . import utils
from .board import Board


class BoardColor(utils.CustomModel):

   board_id = models.ForeignKey(Board, on_delete=models.CASCADE)
   r = models.IntegerField(null=True)
   g = models.IntegerField(null=True)
   b = models.IntegerField(null=True)
   a = models.IntegerField(null=True)
   
        