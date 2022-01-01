from random import randrange
from typing import Dict, List, Union


class GameStatus:
    def __init__(
        self,
        players_amount=1,
        win: Dict[str, Union[str, int, List[dict]]] = None,
    ):
        self.whoTurn = 1
        self.win = win

    def to_dict(self):
        return {
            "win": self.win,
            "whoTurn": self.whoTurn,
        }
