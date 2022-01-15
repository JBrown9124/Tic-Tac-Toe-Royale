class BestMove(object):
    def __init__(self, row_idx, tile_idx, chance,  player_id = ""):
        self.row_idx = row_idx
        self.tile_idx = tile_idx
        self.player_id =  player_id
        self.chance = chance
    def to_dict(self):
        return {"rowIdx":self.row_idx, "tileIdx":self.tile_idx,"playerId":self.player_id}
    def __repr__(self):
        return f"({self.player_id}:{self.row_idx},{self.tile_idx})"