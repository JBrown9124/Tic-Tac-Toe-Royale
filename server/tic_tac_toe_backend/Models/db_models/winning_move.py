from django.db import models
from django.db.models import Q

from . import utils
from .win import Win


class WinningMove(utils.CustomModel):

   win_id = models.ForeignKey(Win, on_delete=models.CASCADE)
   move_id = models.IntegerField(null=True)
   
  
   
        