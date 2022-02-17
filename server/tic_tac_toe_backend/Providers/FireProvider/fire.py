from .FireModels.fire_move import FireMove
from .FireModels.board import Board
import uuid
from random import choice
from .spread import Spread


class Fire:
    def __init__(self, board_size, current_location: FireMove, moves):
        self.board_size = board_size
        self.current_location = current_location
        self.row_idx = current_location.row_idx
        self.column_idx = current_location.column_idx
        self.moves = moves
        self.fire_id = (
            "FIRE" + str(uuid.uuid4())
            if len(current_location.player_id) == 0
            else current_location.player_id
        )
        self.board = Board(size=self.board_size, moves=self.moves).board

    def find_spreadable_tiles(
        self,
    ):
        spreadable_tiles = []

        player_id_who_cast = self.current_location.player_id_who_cast

        spread = Spread(column_idx_change=-1, row_idx_change=-1)
        if spread.is_safe():
            spreadable_tiles.append(
                FireMove(
                    self.row_idx - 1,
                    self.column_idx - 1,
                    player_id=self.fire_id,
                    player_id_who_cast=player_id_who_cast,
                )
            )

        spread = Spread(row_idx_change=-1)
        if spread.is_safe():
            spreadable_tiles.append(
                FireMove(
                    self.row_idx - 1,
                    self.column_idx,
                    player_id=self.fire_id,
                    player_id_who_cast=player_id_who_cast,
                )
            )

        spread = Spread(row_idx_change=-1, column_idx_change=1)
        if spread.is_safe():
            spreadable_tiles.append(
                FireMove(
                    self.row_idx - 1,
                    self.column_idx + 1,
                    player_id=self.fire_id,
                    player_id_who_cast=player_id_who_cast,
                )
            )

        spread = Spread(column_idx_change=1)
        if spread.is_safe():
            spreadable_tiles.append(
                FireMove(
                    self.row_idx,
                    self.column_idx + 1,
                    player_id=self.fire_id,
                    player_id_who_cast=player_id_who_cast,
                )
            )

        spread = Spread(column_idx_change=1, row_idx_change=1)
        if spread.is_safe():
            spreadable_tiles.append(
                FireMove(
                    self.row_idx + 1,
                    self.column_idx + 1,
                    player_id=self.fire_id,
                    player_id_who_cast=player_id_who_cast,
                )
            )

        spread = Spread(row_idx_change=1)
        if spread.is_safe():
            spreadable_tiles.append(
                FireMove(
                    self.row_idx + 1,
                    self.column_idx,
                    player_id=self.fire_id,
                    player_id_who_cast=player_id_who_cast,
                )
            )

        spread = Spread(row_idx_change=1, column_idx_change=-1)
        if spread.is_safe():
            spreadable_tiles.append(
                FireMove(
                    self.row_idx + 1,
                    self.column_idx - 1,
                    player_id=self.fire_id,
                    player_id_who_cast=player_id_who_cast,
                )
            )

        spread = Spread(column_idx_change=-1)
        if spread.is_safe():
            spreadable_tiles.append(
                FireMove(
                    self.row_idx,
                    self.column_idx - 1,
                    player_id=self.fire_id,
                    player_id_who_cast=player_id_who_cast,
                )
            )
        return spreadable_tiles

    def spread(self):
        spreadable_tiles = self.find_spreadable_tiles()

        return (
            choice(spreadable_tiles).to_dict()
            if len(spreadable_tiles) > 0
            else self.current_location.to_dict()
        )


if __name__ == "__main__":
    fire = Fire(15, FireMove(row_idx=4, column_idx=5, player_id="FIREgdfSDFdsfdsfds"))
    print(fire.spread())
