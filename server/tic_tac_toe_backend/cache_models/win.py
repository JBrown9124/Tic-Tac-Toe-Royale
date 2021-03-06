from typing import Union
from .utils import Utils

class Win(Utils):
    def __init__(
        self,
        type: str = None,
        who_won: Union[int, str] = None,
        winning_moves: list = None,
    ):
        self.type = type
        self.who_won = who_won
        self.winning_moves = winning_moves

    # def to_dict(self):
    #     return {
    #         "type": self.type,
    #         "whoWon": self.who_won,
    #         "winningMoves": self.winning_moves,
    #     }
