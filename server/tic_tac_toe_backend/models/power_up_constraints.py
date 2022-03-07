from django.db import models
from django.db.models import Q

from . import utils
from .power_up import PowerUp


class PowerUpConstraints(utils.CustomModel):
    power_up = models.ForeignKey(PowerUp, on_delete=models.CASCADE)
    affects_caster = models.BooleanField(default=False)
    direction = models.CharField(max_length=60)
    cast_anywhere = models.BooleanField(default=False)
    must_be_empty_tile = models.BooleanField(default=False)
    area_shape = models.CharField(max_length=60)
