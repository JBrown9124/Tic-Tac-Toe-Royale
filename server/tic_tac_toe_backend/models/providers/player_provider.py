from tic_tac_toe_backend.models.lobby import Lobby
from tic_tac_toe_backend.models.inventory import Inventory
from tic_tac_toe_backend.models.player import Player
from tic_tac_toe_backend.models.players import Players
from typing import List


class PlayerProvider(object):
    @staticmethod
    def add(player_name: str, lobby: Lobby, is_host: bool):
        players = Players(lobby=lobby)
        players.save()

        player = Player(players=players, name=player_name, is_host=is_host)
        player.save()

        inventory = Inventory(player=player)
        inventory.save()
    
    @staticmethod
    def get_players(lobby:Lobby) -> List[Player]:
            #find ID for bridge table
            players = Players.objects.get(lobby=lobby)
            #get all players from bridge table Players id
            players = Player.objects.filter(players=players)
            
            return [player.to_dict() for player in players]
            
         