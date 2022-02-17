from tic_tac_toe_backend.Providers.FireProvider.safe_spread import SafeSpread
from .FireModels.fire_move import FireMove
from .FireModels.board import Board
import uuid
from random import choice


class FireTile:
    def __init__(self, board_size, current_location: FireMove, moves):
        self.board_size = board_size
        self.current_location = current_location

        self.moves = moves
        self.fire_id = (
            "FIRE" + str(uuid.uuid4())
            if len(self.current_location.player_id) == 0
            else self.current_location.player_id
        )
        self.board = Board(size=self.board_size, moves=self.moves).board

    def find_spreadable_tiles(
        self,
    ):
        spreadable_tiles = []

        player_id_who_cast = self.current_location.player_id_who_cast
        row_idx = self.current_location.row_idx
        column_idx = self.current_location.column_idx

        row_col_idx_changes = [
            (-1, -1),
            (-1, 1),
            (1, 1),
            (1, -1),
            (1, 0),
            (-1, 0),
            (0, 1),
            (0, -1),
        ]
        for row_idx_change, col_idx_change in row_col_idx_changes:
            spread = SafeSpread(
                current_location=self.current_location,
                board_size=self.board_size,
                board=self.board,
                row_idx_change=row_idx_change,
                column_idx_change=col_idx_change,
            )
            if spread.is_safe():
                spreadable_tiles.append(
                    FireMove(
                        row_idx + row_idx_change,
                        column_idx + col_idx_change,
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


# if __name__ == "__main__":
#     fire = Fire(15, FireMove(row_idx=4, column_idx=5, player_id="FIREgdfSDFdsfdsfds"))
#     print(fire.spread())
