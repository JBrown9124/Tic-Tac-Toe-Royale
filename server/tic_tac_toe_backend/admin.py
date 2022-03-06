from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(BoardColor)
admin.site.register(Board)
admin.site.register(GameStatus)
admin.site.register(InventoryItem)
admin.site.register(Inventory)
admin.site.register(Lobby)
admin.site.register(Moves)
admin.site.register(NewMove)
admin.site.register(Player)
admin.site.register(Players)
admin.site.register(PowerUpConstraints)
admin.site.register(PowerUp)
admin.site.register(Win)
admin.site.register(WinningMove)
