async_mode = "eventlet"

import os

import socketio


basedir = os.path.dirname(os.path.realpath(__file__))
sio = socketio.Server(async_mode=async_mode, logger=True, engineio_logger=True, cors_allowed_origins="*" )

thread = None
rooms = []

@sio.event
def connect(sid, environ):
    sio.emit("my_response", {"data": "Connected", "count": 0}, room=sid  )

@sio.on("new-lobby")
def new_lobby(sid, lobby):
  
    sio.emit("my_response", room=sid, skip_sid=sid)
@sio.on("player-join-lobby")
def player_joined(sid, player):
    hostSid = player['hostSid']
    sio.enter_room(hostSid, f'lobby-{hostSid}')
    sio.emit("player-join-lobby", player['player'], room=player['hostSid'], skip_sid=sid)


@sio.on("player-leave-lobby")
def player_left(sid, lobby):
    print(lobby)
    
    hostSid=lobby['hostSid']
    sio.leave_room(hostSid, f'lobby-{hostSid}')
    if len(lobby['lobby'])==0:
        sio.close_room(hostSid, f'lobby-{hostSid}')
    sio.emit("player-leave-lobby", lobby['lobby'],room= hostSid, skip_sid=sid)


@sio.on("player-ready")
def player_ready(sid, lobby):
    sio.emit(
        "player-ready",
        lobby['data']['lobby'],
        skip_sid=sid,
    )
@sio.on("start-game")
def start_game(sid, data):
    sio.emit(
        "start-game",
        {"lobbyId":data['lobbyId']},
        skip_sid=sid,
    )

@sio.on("new-move")
def game_status(sid, data):
    sio.emit(
        "new-move",
        {"newMove": data["newMove"], "gameStatus": data["gameStatus"]},
        skip_sid=sid,
    )

