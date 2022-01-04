class Move(object):
    def __init__(self, row_idx, tile_idx,  turn_number=0):
        self.row_idx = row_idx
        self.tile_idx = tile_idx
        self. turn_number =  turn_number
    def to_dict(self):
        return {"rowIdx":self.row_idx, "tileIdx":self.tile_idx,"turnNumber":self. turn_number}
    def __repr__(self):
        return f"({self. turn_number}:{self.row_idx},{self.tile_idx})"