async_mode = None

import os

import socketio


basedir = os.path.dirname(os.path.realpath(__file__))
sio = socketio.Server(async_mode=async_mode, logger=True, engineio_logger=True, cors_allowed_origins="http://localhost:8000/" )

thread = None


@sio.event
def connect(sid, environ):
    sio.emit("my_response", {"data": "Connected", "count": 0}, room=sid)


@sio.on("player-join-lobby")
def create_lobby(sid, lobby):

    sio.emit("player-join-lobby", lobby['lobby'], skip_sid=sid)


@sio.on("user-joined")
def user_joined(sid, user_id):

    sio.emit("add-user-lobby", user_id, skip_sid=sid)


@sio.on("new-move")
def new_move(sid, move):
    sio.emit(
        "new-move",
        {"row": move["row"], "tile": move["tile"]},
        skip_sid=sid,
    )


@sio.on("game-status")
def game_status(sid, status):
    sio.emit(
        "game-status",
        {"status": status["status"]},
        skip_sid=sid,
    )
