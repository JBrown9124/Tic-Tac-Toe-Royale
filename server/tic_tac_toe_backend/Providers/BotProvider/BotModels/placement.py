class Placement(object):
    def __init__(self, move_direction, move_amount,direction_type=None):
        self.move_direction = move_direction
        self.direction_type = direction_type
        self.move_amount = move_amount

    def __repr__(self):
        return f"New Move is moving {self.direction_type} {self.move_direction} {self.move_amount}"