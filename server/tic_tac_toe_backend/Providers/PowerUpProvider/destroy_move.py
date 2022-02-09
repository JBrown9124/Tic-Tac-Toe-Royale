def destroy_move(new_power_up_use, lobby_board_copy, lobby_game_status_copy):
    
        for affected_tile in new_power_up_use["selectedPowerUpTiles"]:
            for move in lobby_board_copy["moves"]:
                if (
                    move["rowIdx"] == affected_tile["rowIdx"]
                    and move["columnIdx"] == affected_tile["columnIdx"]
                ):
                    lobby_board_copy["moves"].remove(move)
                    
                    for i, fire_tile in enumerate(lobby_game_status_copy["fireTiles"]):
                        if (
                            fire_tile["columnIdx"] == move["columnIdx"]
                            and fire_tile["rowIdx"] == move["rowIdx"]
                        ):
                            lobby_game_status_copy["fireTiles"].remove(fire_tile)