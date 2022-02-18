from random import randrange
from .bot_pieces import bot_pieces
from tic_tac_toe_backend.Models.player import Player


def create_bot(players):
    lobby_bot_pieces = set()
    bot_names = set()
    
    
    for player in players:
        player_id = player["playerId"]
        if player_id[:3] == "BOT":
            lobby_bot_pieces.add(player["piece"])
            bot_names.add(player["name"])
    
    bot_piece = None
    for piece in bot_pieces:
        if piece not in lobby_bot_pieces:
            bot_piece = piece
            break
    
    bot_name = "BOT" + str(randrange(1, 999))
    while bot_name in bot_names:
        bot_name = "BOT" + str(randrange(1, 999))
    player = Player(
        name=bot_name,
        is_loaded=True,
        piece=bot_piece,
        is_ready=True,
        session_id=None,
    ).to_dict()
    player["playerId"] = bot_name
    return player
