class NewMove(object):
    def __init__(self, coordinates, from_move):
        self.coordinates = coordinates
        self.from_move = from_move

    def __repr__(self):
        return f"{self.from_move}:{self.coordinates}"