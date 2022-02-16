from ..FireProvider.fire import Fire
from ..FireProvider.FireModels.fire_move import FireMove
from tic_tac_toe_backend.Models.new_move import Move


def spread_fire(
    lobby_game_status_copy,
    last_turn,
    lobby_board_copy,
):
    for i, tile in enumerate(lobby_game_status_copy["fireTiles"]):
        if last_turn == tile["playerIdWhoCast"]:
            new_fire_position = Fire(
                board_size=lobby_board_copy["size"],
                moves=lobby_board_copy["moves"],
                current_location=FireMove(
                    row_idx=tile["rowIdx"],
                    column_idx=tile["columnIdx"],
                    player_id=tile["playerId"],
                    player_id_who_cast=tile["playerIdWhoCast"],
                ),
            ).spread()

            lobby_game_status_copy["fireTiles"][i] = new_fire_position
            new_fire_move = Move(
                row_idx=new_fire_position["rowIdx"],
                column_idx=new_fire_position["columnIdx"],
                player_id=new_fire_position["playerId"],
            ).to_dict()

            replaced_move = False
            last_fire_position = tile
            for i, move in enumerate(lobby_board_copy["moves"]):
                if (
                    move["rowIdx"] == new_fire_position["rowIdx"]
                    and new_fire_position["columnIdx"] == move["columnIdx"]
                ):
                    lobby_board_copy["moves"][i] = new_fire_move
                    lobby_board_copy["moves"][i]["isFireRoot"] = True
                    replaced_move = True

                if (
                    move["rowIdx"] == last_fire_position["rowIdx"]
                    and move["columnIdx"] == last_fire_position["columnIdx"]
                ):
                    move["isFireRoot"] = False

            if not replaced_move:
                lobby_board_copy["moves"].append(new_fire_move)
