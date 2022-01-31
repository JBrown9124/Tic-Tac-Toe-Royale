class FireMove(object):
    def __init__(self, row_idx, tile_idx,  player_id="", player_id_who_cast=""):
        self.row_idx = row_idx
        self.tile_idx = tile_idx
        self.player_id =  player_id
        self.player_id_who_cast = player_id_who_cast
    def to_dict(self):
        return {"rowIdx":self.row_idx, "tileIdx":self.tile_idx,"playerId":self.player_id, "playerIdWhoCast":self.player_id_who_cast}
    def __repr__(self):
        return f"({self.player_id}:{self.row_idx},{self.tile_idx}, {self.player_id_who_cast})"