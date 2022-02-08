class BestMove(object):
    def __init__(self, row_idx, column_idx, chance,  player_id = ""):
        self.row_idx = row_idx
        self.column_idx = column_idx
        self.player_id =  player_id
        self.chance = chance
    def to_dict(self):
        return {"rowIdx":self.row_idx, "columnIdx":self.column_idx,"playerId":self.player_id}
    def __repr__(self):
        return f"({self.player_id}:{self.row_idx},{self.column_idx})"