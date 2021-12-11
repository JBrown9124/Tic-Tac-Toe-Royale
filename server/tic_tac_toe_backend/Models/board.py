class BoardModel:
    def __init__(self, size=3, color="",win_by=3):
        self.size = size
        self.color = color
        self.win_by = win_by
        self.moves = []
    def to_dict(self):
        return {"size":self.size, "color":self.color, "winBy":self.win_by, "moves":self.moves}