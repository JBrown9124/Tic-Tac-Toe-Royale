from django.db import models
from django.db.models import Q

from . import utils
from .inventory import Inventory


class InventoryItem(utils.CustomModel):

   inventory = models.ForeignKey(Inventory, on_delete=models.CASCADE)
   power_up_id = models.IntegerField(null=True)
   
        