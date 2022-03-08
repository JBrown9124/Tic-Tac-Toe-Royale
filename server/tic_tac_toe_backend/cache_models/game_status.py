from random import randrange
from typing import Dict, List, Union
from .utils import Utils
from .win import Win
from .new_move import Move
from .power_up import PowerUp


class GameStatus(Utils):
    def __init__(
        self,
        who_turn: str = "",
        win: Dict[str, Union[str, int, List[dict]]] = Win().to_dict(),
        new_move=Move().to_dict(),
        new_power_up_use=PowerUp().to_dict(),
        fire_tiles=[],
    ):
        self.who_turn = who_turn
        self.win = (win,)
        self.new_move = new_move
        self.new_power_up_use = new_power_up_use
        self.fire_tiles = []

    # def to_dict(self):
    #     return {
    #         "win": self.win,
    #         "whoTurn": self.who_turn,
    #         "newMove": self.new_move,
    #         "newPowerUpUse": self.new_power_up_use,
    #         "fireTiles": self.fire_tiles,
    #     }
