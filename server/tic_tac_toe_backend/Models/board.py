class BoardModel:
    def __init__(
        self, size=3, color={"r": 255, "g": 255, "b": 255, "a": 0.9}, win_by=3
    ):
        self.size = size
        self.color = color
        self.win_by = win_by
        self.moves = []

    def to_dict(self):
        return {
            "size": self.size,
            "color": self.color,
            "winBy": self.win_by,
            "moves": self.moves,
        }
