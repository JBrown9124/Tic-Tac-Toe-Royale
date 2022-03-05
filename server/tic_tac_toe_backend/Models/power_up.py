from django.db import models
from django.db.models import Q

from . import utils



class PowerUp(utils.CustomModel):
      value = models.IntegerField()
      name = models.CharField(max_length=60)
      description = models.TextField(max_length=255)
      img_url = models.URLField(max_length=255)
      
   
   
        