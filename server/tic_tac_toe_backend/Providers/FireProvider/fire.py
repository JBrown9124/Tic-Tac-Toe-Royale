from .FireModels.fire_move import FireMove
from .FireModels.board import Board
import uuid
from random import choice


class Fire:
    def __init__(self, board_size, current_location: FireMove, moves):
        self.board_size = board_size
        self.current_location = current_location
        self.moves = moves
        self.fire_id = (
            "FIRE" + uuid.uuid4()
            if len(current_location.player_id) == 0
            else current_location.player_id
        )
        self.board = Board(size=self.board_size, moves=self.moves).board

    def find_spreadable_tiles(
        self,
    ):
        spreadable_tiles = []

        if (
            self.current_location.row_idx - 1 >= 0
            and self.current_location.column_idx - 1 >= 0
        ):
            if (
                type(
                    self.board[self.current_location.row_idx - 1][
                        self.current_location.column_idx - 1
                    ]
                )
                == str
            ):
                if (
                    self.board[self.current_location.row_idx - 1][
                        self.current_location.column_idx - 1
                    ][:4]
                    != "FIRE"
                ):

                    spreadable_tiles.append(
                        FireMove(
                            self.current_location.row_idx - 1,
                            self.current_location.column_idx - 1,
                            player_id=self.fire_id,
                            player_id_who_cast=self.current_location.player_id_who_cast,
                        )
                    )

            else:
                spreadable_tiles.append(
                    FireMove(
                        self.current_location.row_idx - 1,
                        self.current_location.column_idx - 1,
                        player_id=self.fire_id,
                        player_id_who_cast=self.current_location.player_id_who_cast,
                    )
                )
        if self.current_location.row_idx - 1 >= 0:
            if (
                type(
                    self.board[self.current_location.row_idx - 1][
                        self.current_location.column_idx
                    ]
                )
                == str
            ):
                if (
                    self.board[self.current_location.row_idx - 1][
                        self.current_location.column_idx
                    ][:4]
                    != "FIRE"
                ):
                    spreadable_tiles.append(
                        FireMove(
                            self.current_location.row_idx - 1,
                            self.current_location.column_idx,
                            player_id=self.fire_id,
                            player_id_who_cast=self.current_location.player_id_who_cast,
                        )
                    )
                
            else:
                spreadable_tiles.append(
                    FireMove(
                        self.current_location.row_idx - 1,
                        self.current_location.column_idx,
                        player_id=self.fire_id,
                        player_id_who_cast=self.current_location.player_id_who_cast,
                    )
                )
        if (
            self.current_location.column_idx + 1 <= self.board_size - 1
            and self.current_location.row_idx - 1 >= 0
        ):
            if (
                type(
                    self.board[self.current_location.row_idx - 1][
                        self.current_location.column_idx + 1
                    ]
                )
                == str
            ):
                if (
                    self.board[self.current_location.row_idx - 1][
                        self.current_location.column_idx + 1
                    ][:4]
                    != "FIRE"
                ):

                    spreadable_tiles.append(
                        FireMove(
                            self.current_location.row_idx - 1,
                            self.current_location.column_idx + 1,
                            player_id=self.fire_id,
                            player_id_who_cast=self.current_location.player_id_who_cast,
                        )
                    )
            else:
                spreadable_tiles.append(
                    FireMove(
                        self.current_location.row_idx - 1,
                        self.current_location.column_idx + 1,
                        player_id=self.fire_id,
                        player_id_who_cast=self.current_location.player_id_who_cast,
                    )
                )
        if self.current_location.column_idx + 1 <= self.board_size - 1:
            if (
                type(
                    self.board[self.current_location.row_idx][
                        self.current_location.column_idx + 1
                    ]
                )
                == str
            ):
                if (
                    self.board[self.current_location.row_idx][
                        self.current_location.column_idx + 1
                    ][:4]
                    != "FIRE"
                ):
                    spreadable_tiles.append(
                        FireMove(
                            self.current_location.row_idx,
                            self.current_location.column_idx + 1,
                            player_id=self.fire_id,
                            player_id_who_cast=self.current_location.player_id_who_cast,
                        )
                    )
            else:
                spreadable_tiles.append(
                    FireMove(
                        self.current_location.row_idx,
                        self.current_location.column_idx + 1,
                        player_id=self.fire_id,
                        player_id_who_cast=self.current_location.player_id_who_cast,
                    )
                )
        if (
            self.current_location.column_idx + 1 <= self.board_size - 1
            and self.current_location.row_idx + 1 <= self.board_size -1
        ):
            if (
                type(
                    self.board[self.current_location.row_idx + 1][
                        self.current_location.column_idx + 1
                    ]
                )
                == str
            ):
                if (
                    self.board[self.current_location.row_idx + 1][
                        self.current_location.column_idx + 1
                    ][:4]
                    != "FIRE"
                ):

                    spreadable_tiles.append(
                        FireMove(
                            self.current_location.row_idx + 1,
                            self.current_location.column_idx + 1,
                            player_id=self.fire_id,
                            player_id_who_cast=self.current_location.player_id_who_cast,
                        )
                    )
            else:
                spreadable_tiles.append(
                    FireMove(
                        self.current_location.row_idx + 1,
                        self.current_location.column_idx + 1,
                        player_id=self.fire_id,
                        player_id_who_cast=self.current_location.player_id_who_cast,
                    )
                )
        if self.current_location.row_idx + 1 <= self.board_size - 1:
            if (
                type(
                    self.board[self.current_location.row_idx + 1][
                        self.current_location.column_idx
                    ]
                )
                == str
            ):
                if (
                    self.board[self.current_location.row_idx + 1][
                        self.current_location.column_idx
                    ][:4]
                    != "FIRE"
                ):
                    spreadable_tiles.append(
                        FireMove(
                            self.current_location.row_idx + 1,
                            self.current_location.column_idx,
                            player_id=self.fire_id,
                            player_id_who_cast=self.current_location.player_id_who_cast,
                        )
                    )
            else:
                spreadable_tiles.append(
                    FireMove(
                        self.current_location.row_idx + 1,
                        self.current_location.column_idx,
                        player_id=self.fire_id,
                        player_id_who_cast=self.current_location.player_id_who_cast,
                    )
                )
        if (
            self.current_location.column_idx - 1 >= 0
            and self.current_location.row_idx + 1 <= self.board_size - 1
        ):
            if (
                type(
                    self.board[self.current_location.row_idx + 1][
                        self.current_location.column_idx - 1
                    ]
                )
                == str
            ):
                if (
                    self.board[self.current_location.row_idx + 1][
                        self.current_location.column_idx - 1
                    ][:4]
                    != "FIRE"
                ):
                    spreadable_tiles.append(
                        FireMove(
                            self.current_location.row_idx + 1,
                            self.current_location.column_idx - 1,
                            player_id=self.fire_id,
                            player_id_who_cast=self.current_location.player_id_who_cast,
                        )
                    )
            else:
                spreadable_tiles.append(
                    FireMove(
                        self.current_location.row_idx + 1,
                        self.current_location.column_idx - 1,
                        player_id=self.fire_id,
                        player_id_who_cast=self.current_location.player_id_who_cast,
                    )
                )

        if self.current_location.column_idx - 1 >= 0:
            if (
                type(
                    self.board[self.current_location.row_idx][
                        self.current_location.column_idx - 1
                    ]
                )
                == str
            ):
                if (
                    self.board[self.current_location.row_idx][
                        self.current_location.column_idx - 1
                    ][:4]
                    != "FIRE"
                ):
                    spreadable_tiles.append(
                        FireMove(
                            self.current_location.row_idx,
                            self.current_location.column_idx - 1,
                            player_id=self.fire_id,
                            player_id_who_cast=self.current_location.player_id_who_cast,
                        )
                    )
            else:
                spreadable_tiles.append(
                    FireMove(
                        self.current_location.row_idx,
                        self.current_location.column_idx - 1,
                        player_id=self.fire_id,
                        player_id_who_cast=self.current_location.player_id_who_cast,
                    )
                )
        return spreadable_tiles

    def spread(self):
        return choice(self.find_spreadable_tiles()).to_dict()


if __name__ == "__main__":
    fire = Fire(15, FireMove(row_idx=4, column_idx=5, player_id="FIREgdfSDFdsfdsfds"))
    print(fire.spread())
