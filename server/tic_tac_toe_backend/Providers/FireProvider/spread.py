from FireProvider.fire import Fire


class Spread(Fire):
    def __init__(
        self,
        column_idx,
        row_idx,
        board_size,
        board,
        column_idx_change=0,
        row_idx_change=0,
    ):
        super().__init__(board_size, board, column_idx, row_idx)
        self.row_idx = self.row_idx + row_idx_change
        self.column_idx = self.column_idx + column_idx_change

    def is_fire(self):
        type(self.board[self.row_idx][self.column_idx]) == str and self.board[
            self.row_idx
        ][self.column_idx][:4] == "FIRE"

    def is_board_constraint(self):
        col_greater_than = self.column_idx >= 0
        row_greater_than = self.row_idx >= 0

        col_less_than_board_size = self.column_idx <= self.board_size - 1
        row_less_than_board_size = self.row_idx <= self.board_size - 1

        if self.row_idx_change == -1 and self.column_idx_change == -1:
            return row_greater_than and col_greater_than

        if self.column_idx_change == 1 and self.row_idx_change == -1:
            return col_less_than_board_size and row_greater_than

        if self.column_idx_change == -1 and self.row_idx_change == 1:
            return col_greater_than and row_less_than_board_size

        if self.column_idx_change == 1 and self.row_idx_change == 1:
            return col_less_than_board_size and row_less_than_board_size

        if self.column_idx_change == 1:
            return col_less_than_board_size

        if self.row_idx_change == 1:
            return row_less_than_board_size

        if self.row_idx_change == -1:
            return row_greater_than

        if self.column_idx_change == -1:
            return col_greater_than

   

    def is_safe(self):
        return not (self.is_fire() and self.is_board_constraint())
