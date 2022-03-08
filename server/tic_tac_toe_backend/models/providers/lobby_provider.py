from tic_tac_toe_backend.models.providers.player_provider import PlayerProvider
from tic_tac_toe_backend.models.providers.player_provider import Player
from tic_tac_toe_backend.models.board import Board
from tic_tac_toe_backend.models.board_color import BoardColor
from tic_tac_toe_backend.models.game_status import GameStatus
from tic_tac_toe_backend.models.inventory import Inventory
from tic_tac_toe_backend.models.lobby import Lobby
from tic_tac_toe_backend.models.moves import Moves
from tic_tac_toe_backend.models.player import Player
from tic_tac_toe_backend.models.players import Players
from tic_tac_toe_backend.models.win import Win


class LobbyProvider:
    @staticmethod
    def create(id, creator_name):
        lobby = Lobby(id=id)
        lobby.save()

        # Board
        board = Board(lobby=lobby)
        board.save()

        board_color = BoardColor(board=board)
        board_color.save()

        # moves = Moves(board_id=board)
        # moves.save()

        # Players
        PlayerProvider.add(creator_name, lobby, True)

        # Game status
        game_status = GameStatus(
            lobby=lobby,
        )
        game_status.save()

        win = Win(game_status=game_status)
        win.save()

    @staticmethod
    def delete(id: int):
        lobby = LobbyProvider.get(id)
        lobby.delete()

    @staticmethod
    def get_all():
        return Lobby.objects.all()
    
    @staticmethod
    def get(id) -> Lobby:
        lobby = Lobby.objects.get(id=id)
        return lobby