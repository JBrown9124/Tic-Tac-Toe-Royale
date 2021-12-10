class BoardResponseModel():
    def __init__(self, new_move, game_status):
        self.new_move = new_move
      
        self.game_status = game_status
    def to_dict(self):
        return {'newMove': self.new_move, 'gameStatus': self.game_status}
        