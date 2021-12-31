class Move(object):
    def __init__(self, row_idx, tile_idx, player_number=0):
        self.row_idx = row_idx
        self.tile_idx = tile_idx
        self.player_number = player_number

    def __repr__(self):
        return f"({self.player_number}:{self.row_idx},{self.tile_idx})"