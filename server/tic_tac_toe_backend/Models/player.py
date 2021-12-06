class Player():
    def __init__(self, name, piece=None ):
        self.name = name
        self.piece = piece
    def to_dict(self):
        return {"name": self.name,"piece": self.piece}
    def __repr__(self):
        
        print(f"name: {self.name}, \n \
            piece: {self.piece}")