class Board:
    def __init__(self, size=3, color="", winBy=3):
        self.size = size
        self.color = color
        self.winBy = winBy
    def to_dict(self):
        return {"size":self.size, "color":self.color, "winBy":self.winBy}