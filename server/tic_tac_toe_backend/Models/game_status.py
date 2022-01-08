from random import randrange
from typing import Dict, List, Union
from .win import Win

class GameStatus:
    def __init__(
        self,
        players_amount=1,
        win: Dict[str, Union[str, int, List[dict]]] = Win().to_dict(),
    ):
        self.whoTurn = randrange(players_amount)
        self.win = win

    def to_dict(self):
        return {
            "win": self.win,
            "whoTurn": self.whoTurn,
        }
