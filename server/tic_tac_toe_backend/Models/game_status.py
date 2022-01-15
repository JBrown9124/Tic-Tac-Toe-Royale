from random import randrange
from typing import Dict, List, Union
from .win import Win

class GameStatus:
    def __init__(
        self,
        whoTurn:str = "",
        win: Dict[str, Union[str, int, List[dict]]] = Win().to_dict(),
    ):
        self.whoTurn = whoTurn
        self.win = win

    def to_dict(self):
        return {
            "win": self.win,
            "whoTurn": self.whoTurn,
        }
