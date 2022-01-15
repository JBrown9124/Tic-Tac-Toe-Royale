class NewMove:
    def __init__(self, row_idx=0, tile_idx=0, player_id=""):
        self.row_idx = row_idx
        self.tile_idx = tile_idx
        self.player_id = player_id
    def to_dict(self):
        return {"rowIdx":self.row_idx,"tileIdx":self.tile_idx,"playerId":self.player_id}