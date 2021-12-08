async_mode = None

import os

import socketio


basedir = os.path.dirname(os.path.realpath(__file__))
sio = socketio.Server(async_mode=async_mode, logger=True, engineio_logger=True, cors_allowed_origins="*" )

thread = None


@sio.event
def connect(sid, environ):
    sio.emit("my_response", {"data": "Connected", "count": 0}, room=sid)


@sio.on("player-join-lobby")
def player_joined(sid, lobby):

    sio.emit("player-join-lobby", lobby['lobby'], skip_sid=sid)


@sio.on("player-leave-lobby")
def player_left(sid, lobby):

    sio.emit("player-leave-lobby", lobby['lobby'], skip_sid=sid)


@sio.on("player-ready")
def player_ready(sid, lobby):
    sio.emit(
        "player-ready",
        lobby['data']['lobby'],
        skip_sid=sid,
    )


@sio.on("game-status")
def game_status(sid, status):
    sio.emit(
        "game-status",
        {"status": status["status"]},
        skip_sid=sid,
    )
