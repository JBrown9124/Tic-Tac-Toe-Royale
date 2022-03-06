from tic_tac_toe_backend.models.board import Board
from tic_tac_toe_backend.models.board_color import BoardColor
from tic_tac_toe_backend.models.game_status import GameStatus
from tic_tac_toe_backend.models.inventory import Inventory
from tic_tac_toe_backend.models.lobby import Lobby
from tic_tac_toe_backend.models.moves import Moves
from tic_tac_toe_backend.models.player import Player
from tic_tac_toe_backend.models.players import Players
from tic_tac_toe_backend.models.win import Win


def create_lobby(id, creator_name):
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
    add_player(creator_name, lobby)

    # Game status
    game_status = GameStatus(
        lobby=lobby,
    )
    game_status.save()

    win = Win(game_status=game_status)
    win.save()


def add_player(player_name, lobby):
    players = Players(lobby=lobby)
    players.save()

    player = Player(players=players, name=player_name, is_host=True)
    player.save()

    inventory = Inventory(player=player)
    inventory.save()
