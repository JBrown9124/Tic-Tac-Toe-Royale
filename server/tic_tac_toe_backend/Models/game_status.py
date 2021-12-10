from random import randrange
class GameStatus():
    def __init__(self, players_amount=1, whoWon=None, ):
        self.whoTurn = randrange(1,players_amount)
        self.whoWon = whoWon
    def to_dict(self):
      return {"whoWon": self.whoWon, "whoTurn": self.whoTurn}
        