from ..FireProvider.FireModels.fire_move import FireMove
from tic_tac_toe_backend.Models.new_move import Move
def add_fire(new_power_up_use, last_turn, lobby_board_copy, lobby_game_status_copy):           

        affected_tile = new_power_up_use["selectedPowerUpTiles"][0]
        fire_move = FireMove(
            row_idx=affected_tile["rowIdx"],
            column_idx=affected_tile["columnIdx"],
            
            player_id_who_cast=last_turn,
        ).to_dict()
        lobby_board_copy["moves"].append(
            Move(
                affected_tile["rowIdx"],
                column_idx=affected_tile["columnIdx"],
                player_id=fire_move["playerId"],
            ).to_dict()
        )
        lobby_game_status_copy["fireTiles"].append(fire_move)