async_mode = None

import os

import socketio


basedir = os.path.dirname(os.path.realpath(__file__))
sio = socketio.Server(
    async_mode=async_mode, logger=True, engineio_logger=True, cors_allowed_origins="*"
)

thread = None
rooms = []


@sio.event
def connect(sid, environ):
    print(sio.rooms(sid))

    sio.emit("my_response", {"data": "Connected", "count": 0}, room=sid)


@sio.on("new-lobby")
def new_lobby(sid, lobby):
    print(sid)
    sio.enter_room(sid, sid)
    print(sio.rooms(sid))
    sio.emit("my_response", room=sid, skip_sid=sid)


@sio.on("player-join-lobby")
def player_joined(sid, data):
    hostSid = data["hostSid"]
    rooms = sio.rooms(sid)
    for room in rooms:
        sio.leave_room(sid, room)
    sio.enter_room(sid, hostSid)
    print(sio.rooms(sid))
    sio.emit("player-join-lobby", data["player"], room=hostSid, skip_sid=sid)


@sio.on("player-leave-lobby")
def player_left(sid, data):
  
    leaving_player = data["player"]
    hostSid = data["hostSid"]
    rooms = sio.rooms(sid)
    for room in rooms:
        sio.leave_room(sid, room)
    if sid == hostSid:
         leaving_player = "HOST"
    sio.emit("player-leave-lobby", leaving_player, room=hostSid, skip_sid=sid)

    if sid == hostSid:
        sio.close_room(hostSid)
      
  
    
@sio.on("player-loaded-game")
def player_loaded(sid, data):
    sio.emit("player-loaded-game", data["playerId"], room=data["hostSid"], skip_sid=sid)

@sio.on("player-ready")
def player_ready(sid, data):
    print(data, "DATA")
    host_sid = data["hostSid"]
    sio.emit(
        "player-ready",
        room=host_sid,
        skip_sid=sid,
    )


@sio.on("start-game")
def start_game(sid, data):
    sio.emit(
        "start-game",
        {"lobbyId": data["lobbyId"]},
        room=data["hostSid"],
        skip_sid=sid,
    )


@sio.on("new-move")
def game_status(sid, received_data):
    data = received_data["data"]
    host_sid = received_data["hostSid"]

    
    sio.emit(
        "new-move",
        {"newMove": data["newMove"], "gameStatus": data["gameStatus"]},
        room=host_sid,
        skip_sid=sid,
    )


@sio.on("rejoin-room-after-refresh")
def rejoin_room(sid, host_sid):
    print(host_sid)
    rooms = sio.rooms(sid)
    if host_sid not in rooms:
        sio.enter_room(sid, host_sid)
        
    
    
