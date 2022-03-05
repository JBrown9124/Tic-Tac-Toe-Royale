class Move:
    def __init__(self, row_idx=0, column_idx=0, player_id="", is_fire_root=False):
        self.row_idx = row_idx
        self.column_idx = column_idx
        self.player_id = player_id
        self.is_fire_root = is_fire_root

    def to_dict(self):
        return {
            "rowIdx": self.row_idx,
            "columnIdx": self.column_idx,
            "playerId": self.player_id,
            "isFireRoot": self.is_fire_root,
        }
