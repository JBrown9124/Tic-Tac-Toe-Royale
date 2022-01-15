from random import randrange
from typing import Dict, List, Union
from .win import Win
from .new_move import NewMove

class GameStatus:
    def __init__(
        self,
        who_turn:str = "",
        win: Dict[str, Union[str, int, List[dict]]] = Win().to_dict(),
        new_move = NewMove().to_dict(),
    ):
        self.who_turn = who_turn
        self.win = win,
        self.new_move = new_move

    def to_dict(self):
        return {
            "win": self.win,
            "whoTurn": self.who_turn,
            "newMove":self.new_move,
        }
